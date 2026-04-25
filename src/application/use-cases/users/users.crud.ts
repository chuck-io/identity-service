import type { UserCreateInput, UserRepository, UserUpdateInput, UserView } from '../../ports/user.repository';
import { NotFoundError } from '../../shared/errors/not-found.error';

export class UsersCrud {
  constructor(private readonly repo: UserRepository) {}

  create(input: UserCreateInput): Promise<UserView> {
    return this.repo.create(input);
  }

  findAll(pagination?: { skip?: number; take?: number }): Promise<UserView[]> {
    return this.repo.findAll(pagination);
  }

  async findByUuid(uuid: string): Promise<UserView> {
    const found = await this.repo.findByUuid(uuid);
    if (!found) throw new NotFoundError('User not found');
    return found;
  }

  async updateByUuid(uuid: string, input: UserUpdateInput): Promise<UserView> {
    await this.findByUuid(uuid);
    return this.repo.updateByUuid(uuid, input);
  }

  async deleteByUuid(uuid: string): Promise<UserView> {
    await this.findByUuid(uuid);
    return this.repo.deleteByUuid(uuid);
  }
}

