export const COMPANY_REPOSITORY = Symbol('COMPANY_REPOSITORY');

export type CompanyView = Readonly<{
  uuid: string;
  companyId: string;
  name: string;
  companyRegistrationNumber: string;
  createdAt: Date;
  updatedAt: Date;
}>;

export type CompanyCreateInput = Readonly<{
  companyId: string;
  name: string;
  companyRegistrationNumber: string;
}>;

export type CompanyUpdateInput = Readonly<{
  companyId?: string;
  name?: string;
  companyRegistrationNumber?: string;
}>;

export interface CompanyRepository {
  create(input: CompanyCreateInput): Promise<CompanyView>;
  findAll(pagination?: { skip?: number; take?: number }): Promise<CompanyView[]>;
  findByUuid(uuid: string): Promise<CompanyView | null>;
  updateByUuid(uuid: string, input: CompanyUpdateInput): Promise<CompanyView>;
  deleteByUuid(uuid: string): Promise<CompanyView>;
}

