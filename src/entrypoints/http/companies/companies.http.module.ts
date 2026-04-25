import { Module } from '@nestjs/common';

import { COMPANY_REPOSITORY } from '../../../application/ports/company.repository';
import { PrismaCompanyRepository } from '../../../infrastructure/database/repositories/prisma-company.repository';

import { CompaniesController } from './companies.controller';

@Module({
  controllers: [CompaniesController],
  providers: [
    PrismaCompanyRepository,
    {
      provide: COMPANY_REPOSITORY,
      useExisting: PrismaCompanyRepository,
    },
  ],
})
export class CompaniesHttpModule {}

