import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './infrastructure/database/prisma/prisma.module';
import { CompaniesHttpModule } from './entrypoints/http/companies/companies.http.module';
import { RolesHttpModule } from './entrypoints/http/roles/roles.http.module';
import { TeachersHttpModule } from './entrypoints/http/teachers/teachers.http.module';
import { UserCompaniesHttpModule } from './entrypoints/http/user-companies/user-companies.http.module';
import { UserRolesHttpModule } from './entrypoints/http/user-roles/user-roles.http.module';
import { UsersHttpModule } from './entrypoints/http/users/users.http.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
    }),
    PrismaModule,
    RolesHttpModule,
    CompaniesHttpModule,
    UsersHttpModule,
    TeachersHttpModule,
    UserRolesHttpModule,
    UserCompaniesHttpModule,
  ],
})
export class AppModule {}

