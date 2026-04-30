import { Module } from '@nestjs/common';

import { ROLE_REPOSITORY } from '../../../application/ports/role.repository';
import { TEACHER_REPOSITORY } from '../../../application/ports/teacher.repository';
import { USER_ROLE_REPOSITORY } from '../../../application/ports/user-role.repository';
import { USER_REPOSITORY } from '../../../application/ports/user.repository';
import { PrismaRoleRepository } from '../../../infrastructure/database/repositories/prisma-role.repository';
import { PrismaTeacherRepository } from '../../../infrastructure/database/repositories/prisma-teacher.repository';
import { PrismaUserRoleRepository } from '../../../infrastructure/database/repositories/prisma-user-role.repository';
import { PrismaUserRepository } from '../../../infrastructure/database/repositories/prisma-user.repository';

import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [
    PrismaRoleRepository,
    PrismaUserRoleRepository,
    PrismaTeacherRepository,
    PrismaUserRepository,
    {
      provide: USER_REPOSITORY,
      useExisting: PrismaUserRepository,
    },
    {
      provide: ROLE_REPOSITORY,
      useExisting: PrismaRoleRepository,
    },
    {
      provide: USER_ROLE_REPOSITORY,
      useExisting: PrismaUserRoleRepository,
    },
    {
      provide: TEACHER_REPOSITORY,
      useExisting: PrismaTeacherRepository,
    },
  ],
})
export class UsersHttpModule {}

