import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ApplicationModule } from './application/application.module';
import { CompaniesHttpModule } from './entrypoints/http/companies/companies.http.module';
import { RolesHttpModule } from './entrypoints/http/roles/roles.http.module';
import { TeachersHttpModule } from './entrypoints/http/teachers/teachers.http.module';
import { UsersHttpModule } from './entrypoints/http/users/users.http.module';
import { AuthHttpModule } from './entrypoints/http/auth/auth.http.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
    }),
    InfrastructureModule,
    ApplicationModule,
    RolesHttpModule,
    CompaniesHttpModule,
    UsersHttpModule,
    TeachersHttpModule,
    AuthHttpModule.register(),
  ],
})
export class AppModule {}

