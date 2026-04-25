import { Module } from '@nestjs/common';

import { USER_REPOSITORY } from '../../../application/ports/user.repository';
import { PrismaUserRepository } from '../../../infrastructure/database/repositories/prisma-user.repository';

import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [
    PrismaUserRepository,
    {
      provide: USER_REPOSITORY,
      useExisting: PrismaUserRepository,
    },
  ],
})
export class UsersHttpModule {}

