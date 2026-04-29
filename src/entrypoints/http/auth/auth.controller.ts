import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { AUTH_REPOSITORY } from '../../../application/ports/auth.repository';
import type { AuthRepository } from '../../../application/ports/auth.repository';
import { TOKEN_SIGNER } from '../../../application/ports/token-signer.port';
import type { TokenSigner } from '../../../application/ports/token-signer.port';
import { LoginUseCase } from '../../../application/use-cases/auth/login.use-case';
import { PasswordHasherService } from '../../../infrastructure/security/password/password-hasher.service';

import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  private readonly login: LoginUseCase;

  constructor(
    @Inject(AUTH_REPOSITORY) authRepo: AuthRepository,
    @Inject(TOKEN_SIGNER) tokenSigner: TokenSigner,
    passwordHasher: PasswordHasherService,
  ) {
    this.login = new LoginUseCase(authRepo, tokenSigner, (hash, password) =>
      passwordHasher.verify(hash, password),
    );
  }

  @Post('login')
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({ type: LoginResponseDto })
  loginUser(@Body() dto: LoginDto) {
    return this.login.execute(dto);
  }
}

