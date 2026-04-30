import { Module } from '@nestjs/common';

import { ApplicationModule } from '@/application/application.module';

import { CompaniesController } from './companies.controller';

@Module({
  imports: [ApplicationModule],
  controllers: [CompaniesController],
})
export class CompaniesHttpModule {}

