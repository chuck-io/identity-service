import { Module } from '@nestjs/common';

import { ApplicationModule } from '@/application/application.module';

import { TeachersController } from './teachers.controller';

@Module({
  imports: [ApplicationModule],
  controllers: [TeachersController],
})
export class TeachersHttpModule {}

