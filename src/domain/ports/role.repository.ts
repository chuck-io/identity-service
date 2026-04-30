export const ROLE_REPOSITORY = Symbol('ROLE_REPOSITORY');

export type RoleView = Readonly<{
  uuid: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}>;

export type RoleCreateInput = Readonly<{
  name: string;
  description?: string | null;
}>;

export type RoleUpdateInput = Readonly<{
  name?: string;
  description?: string | null;
}>;

export interface RoleRepository {
  create(input: RoleCreateInput): Promise<RoleView>;
  findAll(pagination?: { skip?: number; take?: number }): Promise<RoleView[]>;
  findByUuid(uuid: string): Promise<RoleView | null>;
  findByName(name: string): Promise<RoleView | null>;
  updateByUuid(uuid: string, input: RoleUpdateInput): Promise<RoleView>;
  deleteByUuid(uuid: string): Promise<RoleView>;
}

