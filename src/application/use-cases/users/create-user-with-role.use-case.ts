import type { RoleRepository } from '../../ports/role.repository';
import type { UserRepository } from '../../ports/user.repository';
import type { UserRoleRepository } from '../../ports/user-role.repository';
import type { TransactionRunner } from '../../ports/transaction-runner.port';
import { BadRequestError } from '../../shared/errors/bad-request.error';
import { UnauthorizedError } from '../../shared/errors/unauthorized.error';

const ROLE = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  TEACHER: 'TEACHER',
  STUDENT: 'STUDENT',
  FINANCIAL: 'FINANCIAL',
  SECRETARY: 'SECRETARY',
  ENTRERPRISE: 'ENTRERPRISE',
} as const;

export type CreateUserWithRoleInput = Readonly<{
  roleUuid: string;
  companyId?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  personRegistrationNumber?: string;
}>;

export type ActorContext = Readonly<{
  roles: string[];
  companyId?: string | null;
}>;

export class CreateUserWithRoleUseCase {
  constructor(
    private readonly tx: TransactionRunner,
    private readonly rolesRepo: RoleRepository,
    private readonly usersRepo: UserRepository,
    private readonly userRolesRepo: UserRoleRepository,
  ) {}

  async execute(input: CreateUserWithRoleInput, actor: ActorContext) {
    const role = await this.rolesRepo.findByUuid(input.roleUuid);
    if (!role) throw new BadRequestError('Invalid roleUuid');

    if (role.name === ROLE.TEACHER) {
      throw new BadRequestError('Teachers must be created via POST /users/teachers');
    }
    if (role.name === ROLE.ENTRERPRISE) {
      throw new BadRequestError('ENTRERPRISE users must be created via company flows');
    }

    const companyId = input.companyId?.trim();

    if (role.name !== ROLE.SUPER_ADMIN && !companyId) {
      throw new BadRequestError('companyId is required for this role');
    }

    if (role.name === ROLE.SUPER_ADMIN) {
      // Do not require companyId
    }

    // Authorization rules (happy path constraints)
    if (role.name === ROLE.FINANCIAL && !actor.roles.includes(ROLE.ADMIN) && !actor.roles.includes(ROLE.SUPER_ADMIN)) {
      throw new UnauthorizedError('Not allowed to create FINANCIAL users');
    }
    if (role.name === ROLE.SECRETARY && !actor.roles.includes(ROLE.ADMIN) && !actor.roles.includes(ROLE.SUPER_ADMIN)) {
      throw new UnauthorizedError('Not allowed to create SECRETARY users');
    }

    return this.tx.run(async () => {
      const user = await this.usersRepo.create({
        companyId: role.name === ROLE.SUPER_ADMIN ? null : companyId!,
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        password: input.password,
        personRegistrationNumber: input.personRegistrationNumber,
      });

      await this.userRolesRepo.create({
        userUuid: user.uuid,
        roleUuid: role.uuid,
      });

      return user;
    });
  }
}

