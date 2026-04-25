import type {
  UserCompanyCreateInput,
  UserCompanyRepository,
  UserCompanyUpdateInput,
  UserCompanyView,
} from '../../ports/user-company.repository';
import { NotFoundError } from '../../shared/errors/not-found.error';

export class UserCompaniesCrud {
  constructor(private readonly repo: UserCompanyRepository) {}

  create(input: UserCompanyCreateInput): Promise<UserCompanyView> {
    return this.repo.create(input);
  }

  findAll(pagination?: { skip?: number; take?: number }): Promise<UserCompanyView[]> {
    return this.repo.findAll(pagination);
  }

  async findByUuid(uuid: string): Promise<UserCompanyView> {
    const found = await this.repo.findByUuid(uuid);
    if (!found) throw new NotFoundError('UserCompany not found');
    return found;
  }

  async updateByUuid(uuid: string, input: UserCompanyUpdateInput): Promise<UserCompanyView> {
    await this.findByUuid(uuid);
    return this.repo.updateByUuid(uuid, input);
  }

  async deleteByUuid(uuid: string): Promise<UserCompanyView> {
    await this.findByUuid(uuid);
    return this.repo.deleteByUuid(uuid);
  }
}

