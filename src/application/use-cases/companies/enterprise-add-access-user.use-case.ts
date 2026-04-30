import type { CompanyRepository } from '@/domain/ports/company.repository';
import type { RoleRepository } from '@/domain/ports/role.repository';
import type { TransactionRunner } from '@/domain/ports/transaction-runner.port';
import type { UserCompanyRepository } from '@/domain/ports/user-company.repository';
import type { UserRoleRepository } from '@/domain/ports/user-role.repository';
import type { UserRepository } from '@/domain/ports/user.repository';
import { BadRequestError } from '@/application/shared/errors/bad-request.error';
import { UnauthorizedError } from '@/application/shared/errors/unauthorized.error';

export type AddAccessUserInput = Readonly<{
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}>;

export type ActorContext = Readonly<{
  roles: string[];
  companyId?: string | null;
}>;

export class EnterpriseAddAccessUserUseCase {
  constructor(
    private readonly tx: TransactionRunner,
    private readonly companyRepo: CompanyRepository,
    private readonly rolesRepo: RoleRepository,
    private readonly usersRepo: UserRepository,
    private readonly userRolesRepo: UserRoleRepository,
    private readonly userCompaniesRepo: UserCompanyRepository,
  ) {}

  async execute(companyUuid: string, input: AddAccessUserInput, actor: ActorContext) {
    if (!actor.roles.includes('ENTRERPRISE')) throw new UnauthorizedError('Only ENTRERPRISE can add access users');

    const company = await this.companyRepo.findByUuid(companyUuid);
    if (!company) throw new BadRequestError('Invalid companyUuid');

    if (!actor.companyId || actor.companyId !== company.companyId) {
      throw new UnauthorizedError('Cannot add users for another company');
    }

    const enterpriseRole = await this.rolesRepo.findByName('ENTRERPRISE');
    if (!enterpriseRole) throw new BadRequestError('ENTRERPRISE role not found (seed required)');

    return this.tx.run(async () => {
      const user = await this.usersRepo.create({
        companyId: company.companyId,
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        password: input.password,
      });

      await this.userRolesRepo.create({ userUuid: user.uuid, roleUuid: enterpriseRole.uuid });
      await this.userCompaniesRepo.create({ userUuid: user.uuid, companyUuid: company.uuid });

      return user;
    });
  }
}

