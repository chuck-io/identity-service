import type { RoleRepository } from '../../ports/role.repository';
import type { TeacherRepository } from '../../ports/teacher.repository';
import type { TransactionRunner } from '../../ports/transaction-runner.port';
import type { UserRoleRepository } from '../../ports/user-role.repository';
import type { UserRepository } from '../../ports/user.repository';
import { BadRequestError } from '../../shared/errors/bad-request.error';
import { UnauthorizedError } from '../../shared/errors/unauthorized.error';

export type CreateTeacherUserInput = Readonly<{
  companyId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  personRegistrationNumber?: string;
}>;

export type ActorContext = Readonly<{
  roles: string[];
}>;

export class CreateTeacherUserUseCase {
  constructor(
    private readonly tx: TransactionRunner,
    private readonly rolesRepo: RoleRepository,
    private readonly usersRepo: UserRepository,
    private readonly userRolesRepo: UserRoleRepository,
    private readonly teachersRepo: TeacherRepository,
  ) {}

  async execute(input: CreateTeacherUserInput, actor: ActorContext) {
    const allowed = actor.roles.includes('SUPER_ADMIN') || actor.roles.includes('ADMIN') || actor.roles.includes('SECRETARY');
    if (!allowed) throw new UnauthorizedError('Not allowed to create TEACHER users');

    const role = await this.rolesRepo.findByName('TEACHER');
    if (!role) throw new BadRequestError('TEACHER role not found (seed required)');

    if (!input.companyId?.trim()) throw new BadRequestError('companyId is required for TEACHER');

    return this.tx.run(async () => {
      const user = await this.usersRepo.create({
        companyId: input.companyId.trim(),
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

      await this.teachersRepo.create({
        userUuid: user.uuid,
        subject: 'not defined',
      });

      return user;
    });
  }
}

