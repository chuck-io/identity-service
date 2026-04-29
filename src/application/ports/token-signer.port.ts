export const TOKEN_SIGNER = Symbol('TOKEN_SIGNER');

export type AccessToken = Readonly<{
  accessToken: string;
  tokenType: 'Bearer';
  expiresIn: string;
}>;

export interface TokenSigner {
  signAccessToken(payload: Record<string, unknown>): Promise<AccessToken>;
}

