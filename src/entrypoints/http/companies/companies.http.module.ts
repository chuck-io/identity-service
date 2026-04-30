import { Module } from '@nestjs/common';

import { COMPANY_ACCESS_QUERY } from '../../../application/ports/company-access.query';
import { COMPANY_REPOSITORY } from '../../../application/ports/company.repository';
import { ROLE_REPOSITORY } from '../../../application/ports/role.repository';
import { USER_COMPANY_REPOSITORY } from '../../../application/ports/user-company.repository';
import { USER_ROLE_REPOSITORY } from '../../../application/ports/user-role.repository';
import { USER_REPOSITORY } from '../../../application/ports/user.repository';
import { PrismaCompanyRepository } from '../../../infrastructure/database/repositories/prisma-company.repository';
import { PrismaRoleRepository } from '../../../infrastructure/database/repositories/prisma-role.repository';
import { PrismaUserCompanyRepository } from '../../../infrastructure/database/repositories/prisma-user-company.repository';
import { PrismaUserRoleRepository } from '../../../infrastructure/database/repositories/prisma-user-role.repository';
import { PrismaUserRepository } from '../../../infrastructure/database/repositories/prisma-user.repository';
import { PrismaCompanyAccessQuery } from '../../../infrastructure/company/prisma-company-access.query';

import { CompaniesController } from './companies.controller';

@Module({
  controllers: [CompaniesController],
  providers: [
    PrismaCompanyAccessQuery,
    PrismaCompanyRepository,
    PrismaRoleRepository,
    PrismaUserRepository,
    PrismaUserRoleRepository,
    PrismaUserCompanyRepository,
    {
      provide: COMPANY_REPOSITORY,
      useExisting: PrismaCompanyRepository,
    },
    {
      provide: COMPANY_ACCESS_QUERY,
      useExisting: PrismaCompanyAccessQuery,
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
      provide: USER_COMPANY_REPOSITORY,
      useExisting: PrismaUserCompanyRepository,
    },
  ],
})
export class CompaniesHttpModule {}

