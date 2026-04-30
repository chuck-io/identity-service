export const SUPER_ADMIN_QUERY = Symbol('SUPER_ADMIN_QUERY');

export interface SuperAdminQuery {
  exists(): Promise<boolean>;
}

