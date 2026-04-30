import { DynamicModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import type { StringValue } from 'ms';
import { PassportModule } from '@nestjs/passport';

import { AUTH_REPOSITORY } from '../../../application/ports/auth.repository';
import { ROLE_REPOSITORY } from '../../../application/ports/role.repository';
import { USER_ROLE_REPOSITORY } from '../../../application/ports/user-role.repository';
import { USER_REPOSITORY } from '../../../application/ports/user.repository';
import { TOKEN_SIGNER } from '../../../application/ports/token-signer.port';
import { PrismaAuthRepository } from '../../../infrastructure/auth/prisma-auth.repository';
import { JwtTokenSignerService } from '../../../infrastructure/auth/jwt-token-signer.service';
import { PrismaSuperAdminQuery } from '../../../infrastructure/auth/prisma-super-admin.query';
import { PrismaRoleRepository } from '../../../infrastructure/database/repositories/prisma-role.repository';
import { PrismaUserRoleRepository } from '../../../infrastructure/database/repositories/prisma-user-role.repository';
import { PrismaUserRepository } from '../../../infrastructure/database/repositories/prisma-user.repository';

import { AuthController } from './auth.controller';
import { BootstrapSuperAdminController } from './bootstrap-super-admin.controller';
import { JwtStrategy } from './jwt/jwt.strategy';

function isTruthyEnvFlag(raw: string | undefined): boolean {
  if (!raw) return false;
  return ['1', 'true', 'yes', 'y', 'on'].includes(raw.trim().toLowerCase());
}

@Module({})
export class AuthHttpModule {
  static async register(): Promise<DynamicModule> {
    await ConfigModule.envVariablesLoaded;
    const bootstrapEnabled = isTruthyEnvFlag(process.env.BOOTSTRAP_SUPER_ADMIN_HTTP_ENABLED);

    return {
      module: AuthHttpModule,
      imports: [
        ConfigModule,
        PassportModule,
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
      controllers: bootstrapEnabled ? [AuthController, BootstrapSuperAdminController] : [AuthController],
      providers: [
        PrismaAuthRepository,
        JwtTokenSignerService,
        JwtStrategy,
        PrismaSuperAdminQuery,
        PrismaRoleRepository,
        PrismaUserRepository,
        PrismaUserRoleRepository,
        {
          provide: AUTH_REPOSITORY,
          useExisting: PrismaAuthRepository,
        },
        {
          provide: ROLE_REPOSITORY,
          useExisting: PrismaRoleRepository,
        },
        {
          provide: USER_REPOSITORY,
          useExisting: PrismaUserRepository,
        },
        {
          provide: USER_ROLE_REPOSITORY,
          useExisting: PrismaUserRoleRepository,
        },
        {
          provide: TOKEN_SIGNER,
          useExisting: JwtTokenSignerService,
        },
      ],
    };
  }
}

