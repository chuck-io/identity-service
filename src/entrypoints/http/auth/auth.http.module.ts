import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import type { StringValue } from 'ms';

import { AUTH_REPOSITORY } from '../../../application/ports/auth.repository';
import { TOKEN_SIGNER } from '../../../application/ports/token-signer.port';
import { PrismaAuthRepository } from '../../../infrastructure/auth/prisma-auth.repository';
import { JwtTokenSignerService } from '../../../infrastructure/auth/jwt-token-signer.service';

import { AuthController } from './auth.controller';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: (() => {
          const secret = config.get<string>('JWT_SECRET');
          if (!secret) throw new Error('Missing JWT_SECRET');
          return secret;
        })(),
        signOptions: { expiresIn: config.get<string>('JWT_EXPIRES_IN', '15m') as StringValue },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    PrismaAuthRepository,
    JwtTokenSignerService,
    {
      provide: AUTH_REPOSITORY,
      useExisting: PrismaAuthRepository,
    },
    {
      provide: TOKEN_SIGNER,
      useExisting: JwtTokenSignerService,
    },
  ],
})
export class AuthHttpModule {}

