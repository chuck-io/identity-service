import { Module } from '@nestjs/common';

import { ROLE_REPOSITORY } from '../../../application/ports/role.repository';
import { PrismaRoleRepository } from '../../../infrastructure/database/repositories/prisma-role.repository';

import { RolesController } from './roles.controller';

@Module({
  controllers: [RolesController],
  providers: [
    PrismaRoleRepository,
    {
      provide: ROLE_REPOSITORY,
      useExisting: PrismaRoleRepository,
    },
  ],
})
export class RolesHttpModule {}

