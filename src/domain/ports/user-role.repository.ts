export const USER_ROLE_REPOSITORY = Symbol('USER_ROLE_REPOSITORY');

export type UserRoleView = Readonly<{
  uuid: string;
  userUuid: string;
  roleUuid: string;
  createdAt: Date;
  updatedAt: Date;
}>;

export type UserRoleCreateInput = Readonly<{
  userUuid: string;
  roleUuid: string;
}>;

export type UserRoleUpdateInput = Readonly<{
  userUuid?: string;
  roleUuid?: string;
}>;

export interface UserRoleRepository {
  create(input: UserRoleCreateInput): Promise<UserRoleView>;
  findAll(pagination?: { skip?: number; take?: number }): Promise<UserRoleView[]>;
  findByUuid(uuid: string): Promise<UserRoleView | null>;
  updateByUuid(uuid: string, input: UserRoleUpdateInput): Promise<UserRoleView>;
  deleteByUuid(uuid: string): Promise<UserRoleView>;
}

