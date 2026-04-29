export const AUTH_REPOSITORY = Symbol('AUTH_REPOSITORY');

export type AuthUser = Readonly<{
  uuid: string;
  email: string;
  passwordHash: string;
}>;

export interface AuthRepository {
  findUserForLoginByEmail(email: string): Promise<AuthUser | null>;
}

