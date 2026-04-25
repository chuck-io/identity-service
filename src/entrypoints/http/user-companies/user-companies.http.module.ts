import { Module } from '@nestjs/common';

import { USER_COMPANY_REPOSITORY } from '../../../application/ports/user-company.repository';
import { PrismaUserCompanyRepository } from '../../../infrastructure/database/repositories/prisma-user-company.repository';

import { UserCompaniesController } from './user-companies.controller';

@Module({
  controllers: [UserCompaniesController],
  providers: [
    PrismaUserCompanyRepository,
    {
      provide: USER_COMPANY_REPOSITORY,
      useExisting: PrismaUserCompanyRepository,
    },
  ],
})
export class UserCompaniesHttpModule {}

