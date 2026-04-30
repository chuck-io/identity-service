import { Module } from '@nestjs/common';

import { ApplicationModule } from '@/application/application.module';

import { RolesController } from './roles.controller';

@Module({
  imports: [ApplicationModule],
  controllers: [RolesController],
})
export class RolesHttpModule {}

