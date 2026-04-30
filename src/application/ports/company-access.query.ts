export const COMPANY_ACCESS_QUERY = Symbol('COMPANY_ACCESS_QUERY');

export interface CompanyAccessQuery {
  companyHasEnterpriseUser(companyUuid: string): Promise<boolean>;
}

