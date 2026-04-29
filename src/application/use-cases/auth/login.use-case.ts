import type { AuthRepository } from '../../ports/auth.repository';
import type { TokenSigner } from '../../ports/token-signer.port';
import type { AccessToken } from '../../ports/token-signer.port';
import { UnauthorizedError } from '../../shared/errors/unauthorized.error';

export class LoginUseCase {
  constructor(
    private readonly authRepo: AuthRepository,
    private readonly tokenSigner: TokenSigner,
    private readonly passwordVerifier: (hash: string, password: string) => Promise<boolean>,
  ) {}

  async execute(input: { email: string; password: string }): Promise<AccessToken> {
    const email = input.email.trim().toLowerCase();
    const user = await this.authRepo.findUserForLoginByEmail(email);
    if (!user) throw new UnauthorizedError('Invalid credentials');

    const ok = await this.passwordVerifier(user.passwordHash, input.password);
    if (!ok) throw new UnauthorizedError('Invalid credentials');

    return this.tokenSigner.signAccessToken({
      sub: user.uuid,
      email: user.email,
    });
  }
}

