import type {
  CompanyCreateInput,
  CompanyRepository,
  CompanyUpdateInput,
  CompanyView,
} from '../../ports/company.repository';
import { NotFoundError } from '../../shared/errors/not-found.error';

export class CompaniesCrud {
  constructor(private readonly repo: CompanyRepository) {}

  create(input: CompanyCreateInput): Promise<CompanyView> {
    return this.repo.create(input);
  }

  findAll(pagination?: { skip?: number; take?: number }): Promise<CompanyView[]> {
    return this.repo.findAll(pagination);
  }

  async findByUuid(uuid: string): Promise<CompanyView> {
    const found = await this.repo.findByUuid(uuid);
    if (!found) throw new NotFoundError('Company not found');
    return found;
  }

  async updateByUuid(uuid: string, input: CompanyUpdateInput): Promise<CompanyView> {
    await this.findByUuid(uuid);
    return this.repo.updateByUuid(uuid, input);
  }

  async deleteByUuid(uuid: string): Promise<CompanyView> {
    await this.findByUuid(uuid);
    return this.repo.deleteByUuid(uuid);
  }
}

