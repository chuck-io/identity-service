import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import type { StringValue } from 'ms';

import { AUTH_REPOSITORY } from '@/domain/ports/auth.repository';
import { COMPANY_ACCESS_QUERY } from '@/domain/ports/company-access.query';
import { COMPANY_REPOSITORY } from '@/domain/ports/company.repository';
import { PASSWORD_HASHER } from '@/domain/ports/password-hasher.port';
import { ROLE_REPOSITORY } from '@/domain/ports/role.repository';
import { SUPER_ADMIN_QUERY } from '@/domain/ports/super-admin.query';
import { TEACHER_REPOSITORY } from '@/domain/ports/teacher.repository';
import { TOKEN_SIGNER } from '@/domain/ports/token-signer.port';
import { USER_COMPANY_REPOSITORY } from '@/domain/ports/user-company.repository';
import { USER_REPOSITORY } from '@/domain/ports/user.repository';
import { USER_ROLE_REPOSITORY } from '@/domain/ports/user-role.repository';

import { JwtTokenSignerService } from './auth/jwt-token-signer.service';
import { PrismaAuthRepository } from './auth/prisma-auth.repository';
import { PrismaSuperAdminQuery } from './auth/prisma-super-admin.query';
import { PrismaCompanyAccessQuery } from './company/prisma-company-access.query';
import { PrismaCompanyRepository } from './database/repositories/prisma-company.repository';
import { PrismaRoleRepository } from './database/repositories/prisma-role.repository';
import { PrismaTeacherRepository } from './database/repositories/prisma-teacher.repository';
import { PrismaUserCompanyRepository } from './database/repositories/prisma-user-company.repository';
import { PrismaUserRepository } from './database/repositories/prisma-user.repository';
import { PrismaUserRoleRepository } from './database/repositories/prisma-user-role.repository';
import { PrismaModule } from './database/prisma/prisma.module';
import { PasswordHasherService } from './security/password/password-hasher.service';

@Global()
@Module({
  imports: [
    PrismaModule,
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
  providers: [
    PrismaAuthRepository,
    PrismaSuperAdminQuery,
    JwtTokenSignerService,
    PrismaCompanyAccessQuery,
    PrismaCompanyRepository,
    PrismaRoleRepository,
    PrismaTeacherRepository,
    PrismaUserRepository,
    PrismaUserRoleRepository,
    PrismaUserCompanyRepository,
    { provide: AUTH_REPOSITORY, useExisting: PrismaAuthRepository },
    { provide: TOKEN_SIGNER, useExisting: JwtTokenSignerService },
    { provide: COMPANY_ACCESS_QUERY, useExisting: PrismaCompanyAccessQuery },
    { provide: COMPANY_REPOSITORY, useExisting: PrismaCompanyRepository },
    { provide: ROLE_REPOSITORY, useExisting: PrismaRoleRepository },
    { provide: TEACHER_REPOSITORY, useExisting: PrismaTeacherRepository },
    { provide: USER_REPOSITORY, useExisting: PrismaUserRepository },
    { provide: USER_ROLE_REPOSITORY, useExisting: PrismaUserRoleRepository },
    { provide: USER_COMPANY_REPOSITORY, useExisting: PrismaUserCompanyRepository },
    { provide: PASSWORD_HASHER, useExisting: PasswordHasherService },
    { provide: SUPER_ADMIN_QUERY, useExisting: PrismaSuperAdminQuery },
  ],
  exports: [
    AUTH_REPOSITORY,
    TOKEN_SIGNER,
    COMPANY_ACCESS_QUERY,
    COMPANY_REPOSITORY,
    PASSWORD_HASHER,
    ROLE_REPOSITORY,
    SUPER_ADMIN_QUERY,
    TEACHER_REPOSITORY,
    USER_REPOSITORY,
    USER_ROLE_REPOSITORY,
    USER_COMPANY_REPOSITORY,
    PrismaModule,
  ],
})
export class InfrastructureModule {}

