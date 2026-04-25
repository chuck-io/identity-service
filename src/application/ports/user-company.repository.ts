export const USER_COMPANY_REPOSITORY = Symbol('USER_COMPANY_REPOSITORY');

export type UserCompanyView = Readonly<{
  uuid: string;
  userUuid: string;
  companyUuid: string;
  createdAt: Date;
  updatedAt: Date;
}>;

export type UserCompanyCreateInput = Readonly<{
  userUuid: string;
  companyUuid: string;
}>;

export type UserCompanyUpdateInput = Readonly<{
  userUuid?: string;
  companyUuid?: string;
}>;

export interface UserCompanyRepository {
  create(input: UserCompanyCreateInput): Promise<UserCompanyView>;
  findAll(pagination?: { skip?: number; take?: number }): Promise<UserCompanyView[]>;
  findByUuid(uuid: string): Promise<UserCompanyView | null>;
  updateByUuid(uuid: string, input: UserCompanyUpdateInput): Promise<UserCompanyView>;
  deleteByUuid(uuid: string): Promise<UserCompanyView>;
}

