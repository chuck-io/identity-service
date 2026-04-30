import type { RoleCreateInput, RoleRepository, RoleUpdateInput, RoleView } from '@/domain/ports/role.repository';
import { NotFoundError } from '@/application/shared/errors/not-found.error';

export class RolesCrud {
  constructor(private readonly repo: RoleRepository) {}

  create(input: RoleCreateInput): Promise<RoleView> {
    return this.repo.create(input);
  }

  findAll(pagination?: { skip?: number; take?: number }): Promise<RoleView[]> {
    return this.repo.findAll(pagination);
  }

  async findByUuid(uuid: string): Promise<RoleView> {
    const found = await this.repo.findByUuid(uuid);
    if (!found) throw new NotFoundError('Role not found');
    return found;
  }

  async updateByUuid(uuid: string, input: RoleUpdateInput): Promise<RoleView> {
    await this.findByUuid(uuid);
    return this.repo.updateByUuid(uuid, input);
  }

  async deleteByUuid(uuid: string): Promise<RoleView> {
    await this.findByUuid(uuid);
    return this.repo.deleteByUuid(uuid);
  }
}

