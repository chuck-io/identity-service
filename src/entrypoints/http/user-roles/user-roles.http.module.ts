import { Module } from '@nestjs/common';

import { USER_ROLE_REPOSITORY } from '../../../application/ports/user-role.repository';
import { PrismaUserRoleRepository } from '../../../infrastructure/database/repositories/prisma-user-role.repository';

import { UserRolesController } from './user-roles.controller';

@Module({
  controllers: [UserRolesController],
  providers: [
    PrismaUserRoleRepository,
    {
      provide: USER_ROLE_REPOSITORY,
      useExisting: PrismaUserRoleRepository,
    },
  ],
})
export class UserRolesHttpModule {}

