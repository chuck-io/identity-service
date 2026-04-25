import type {
  UserRoleCreateInput,
  UserRoleRepository,
  UserRoleUpdateInput,
  UserRoleView,
} from '../../ports/user-role.repository';
import { NotFoundError } from '../../shared/errors/not-found.error';

export class UserRolesCrud {
  constructor(private readonly repo: UserRoleRepository) {}

  create(input: UserRoleCreateInput): Promise<UserRoleView> {
    return this.repo.create(input);
  }

  findAll(pagination?: { skip?: number; take?: number }): Promise<UserRoleView[]> {
    return this.repo.findAll(pagination);
  }

  async findByUuid(uuid: string): Promise<UserRoleView> {
    const found = await this.repo.findByUuid(uuid);
    if (!found) throw new NotFoundError('UserRole not found');
    return found;
  }

  async updateByUuid(uuid: string, input: UserRoleUpdateInput): Promise<UserRoleView> {
    await this.findByUuid(uuid);
    return this.repo.updateByUuid(uuid, input);
  }

  async deleteByUuid(uuid: string): Promise<UserRoleView> {
    await this.findByUuid(uuid);
    return this.repo.deleteByUuid(uuid);
  }
}

