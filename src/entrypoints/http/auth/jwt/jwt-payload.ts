export type JwtPayload = Readonly<{
  sub: string; // user uuid
  email: string;
  roles: string[];
  companyId?: string | null;
}>;

