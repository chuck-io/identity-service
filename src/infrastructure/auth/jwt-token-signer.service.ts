import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import type { AccessToken, TokenSigner } from '@/domain/ports/token-signer.port';

@Injectable()
export class JwtTokenSignerService implements TokenSigner {
  private readonly expiresIn: string;

  constructor(
    private readonly jwt: JwtService,
    config: ConfigService,
  ) {
    this.expiresIn = config.get<string>('JWT_EXPIRES_IN', '15m');
  }

  async signAccessToken(payload: Record<string, unknown>): Promise<AccessToken> {
    const accessToken = await this.jwt.signAsync(payload);
    return {
      accessToken,
      tokenType: 'Bearer',
      expiresIn: this.expiresIn,
    };
  }
}

