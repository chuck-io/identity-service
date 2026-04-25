export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export type UserView = Readonly<{
  uuid: string;
  companyId: string | null;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}>;

export type UserCreateInput = Readonly<{
  companyId?: string | null;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}>;

export type UserUpdateInput = Readonly<{
  companyId?: string | null;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}>;

export interface UserRepository {
  create(input: UserCreateInput): Promise<UserView>;
  findAll(pagination?: { skip?: number; take?: number }): Promise<UserView[]>;
  findByUuid(uuid: string): Promise<UserView | null>;
  updateByUuid(uuid: string, input: UserUpdateInput): Promise<UserView>;
  deleteByUuid(uuid: string): Promise<UserView>;
}

