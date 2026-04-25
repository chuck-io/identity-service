import { Module } from '@nestjs/common';

import { TEACHER_REPOSITORY } from '../../../application/ports/teacher.repository';
import { PrismaTeacherRepository } from '../../../infrastructure/database/repositories/prisma-teacher.repository';

import { TeachersController } from './teachers.controller';

@Module({
  controllers: [TeachersController],
  providers: [
    PrismaTeacherRepository,
    {
      provide: TEACHER_REPOSITORY,
      useExisting: PrismaTeacherRepository,
    },
  ],
})
export class TeachersHttpModule {}

