import type { CompanyRepository } from '../../ports/company.repository';
import type { CompanyAccessQuery } from '../../ports/company-access.query';
import type { RoleRepository } from '../../ports/role.repository';
import type { TransactionRunner } from '../../ports/transaction-runner.port';
import type { UserCompanyRepository } from '../../ports/user-company.repository';
import type { UserRoleRepository } from '../../ports/user-role.repository';
import type { UserRepository } from '../../ports/user.repository';
import { BadRequestError } from '../../shared/errors/bad-request.error';
import { UnauthorizedError } from '../../shared/errors/unauthorized.error';

export type CreateCompanyInput = Readonly<{
  companyId: string;
  name: string;
  companyRegistrationNumber: string;
  defaultUser?: Readonly<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }>;
}>;

export type ActorContext = Readonly<{
  roles: string[];
}>;

export class CreateCompanyUseCase {
  constructor(
    private readonly tx: TransactionRunner,
    private readonly companyRepo: CompanyRepository,
    private readonly rolesRepo: RoleRepository,
    private readonly usersRepo: UserRepository,
    private readonly userRolesRepo: UserRoleRepository,
    private readonly userCompaniesRepo: UserCompanyRepository,
    private readonly accessQuery: CompanyAccessQuery,
  ) {}

  async execute(input: CreateCompanyInput, actor: ActorContext) {
    const hasDefaultUser = Boolean(input.defaultUser);

    if (!hasDefaultUser && !actor.roles.includes('ADMIN')) {
      // 8.3
      throw new UnauthorizedError('Only ADMIN can create companies without default user');
    }

    if (hasDefaultUser && !(actor.roles.includes('ADMIN') || actor.roles.includes('SUPER_ADMIN'))) {
      throw new UnauthorizedError('Not allowed to create companies with default user');
    }

    return this.tx.run(async () => {
      const company = await this.companyRepo.create({
        companyId: input.companyId,
        name: input.name,
        companyRegistrationNumber: input.companyRegistrationNumber,
      });

      if (!input.defaultUser) return { company };

      const enterpriseRole = await this.rolesRepo.findByName('ENTRERPRISE');
      if (!enterpriseRole) throw new BadRequestError('ENTRERPRISE role not found (seed required)');

      const user = await this.usersRepo.create({
        companyId: company.companyId,
        firstName: input.defaultUser.firstName,
        lastName: input.defaultUser.lastName,
        email: input.defaultUser.email,
        password: input.defaultUser.password,
      });

      await this.userRolesRepo.create({ userUuid: user.uuid, roleUuid: enterpriseRole.uuid });

      await this.userCompaniesRepo.create({ userUuid: user.uuid, companyUuid: company.uuid });

      return { company, defaultUser: user };
    });
  }

  async addDefaultUser(companyUuid: string, input: NonNullable<CreateCompanyInput['defaultUser']>, actor: ActorContext) {
    if (!actor.roles.includes('ADMIN')) throw new UnauthorizedError('Only ADMIN can add default users');

    const has = await this.accessQuery.companyHasEnterpriseUser(companyUuid);
    if (has) throw new BadRequestError('Company already has a default enterprise user');

    const enterpriseRole = await this.rolesRepo.findByName('ENTRERPRISE');
    if (!enterpriseRole) throw new BadRequestError('ENTRERPRISE role not found (seed required)');

    return this.tx.run(async () => {
      const company = await this.companyRepo.findByUuid(companyUuid);
      if (!company) throw new BadRequestError('Invalid companyUuid');

      const user = await this.usersRepo.create({
        companyId: company.companyId,
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        password: input.password,
      });

      await this.userRolesRepo.create({ userUuid: user.uuid, roleUuid: enterpriseRole.uuid });
      await this.userCompaniesRepo.create({ userUuid: user.uuid, companyUuid: company.uuid });

      return { company, defaultUser: user };
    });
  }
}

