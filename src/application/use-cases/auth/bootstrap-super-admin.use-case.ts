import type { RoleRepository } from '../../ports/role.repository';
import type { TransactionRunner } from '../../ports/transaction-runner.port';
import type { UserRoleRepository } from '../../ports/user-role.repository';
import type { UserRepository } from '../../ports/user.repository';
import { BadRequestError } from '../../shared/errors/bad-request.error';

export class BootstrapSuperAdminUseCase {
  constructor(
    private readonly tx: TransactionRunner,
    private readonly rolesRepo: RoleRepository,
    private readonly usersRepo: UserRepository,
    private readonly userRolesRepo: UserRoleRepository,
    private readonly hasSuperAdmin: () => Promise<boolean>,
  ) {}

  async execute(input: { firstName: string; lastName: string; email: string; password: string }) {
    const already = await this.hasSuperAdmin();
    if (already) throw new BadRequestError('SUPER_ADMIN already exists');

    const superRole = await this.rolesRepo.findByName('SUPER_ADMIN');
    if (!superRole) throw new BadRequestError('SUPER_ADMIN role not found (seed required)');

    return this.tx.run(async () => {
      const user = await this.usersRepo.create({
        companyId: null,
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        password: input.password,
      });

      await this.userRolesRepo.create({ userUuid: user.uuid, roleUuid: superRole.uuid });
      return user;
    });
  }
}

