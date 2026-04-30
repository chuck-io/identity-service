import { Module } from '@nestjs/common';

import type { AuthRepository } from '@/domain/ports/auth.repository';
import { AUTH_REPOSITORY } from '@/domain/ports/auth.repository';
import type { CompanyAccessQuery } from '@/domain/ports/company-access.query';
import { COMPANY_ACCESS_QUERY } from '@/domain/ports/company-access.query';
import type { CompanyRepository } from '@/domain/ports/company.repository';
import { COMPANY_REPOSITORY } from '@/domain/ports/company.repository';
import type { PasswordHasherPort } from '@/domain/ports/password-hasher.port';
import { PASSWORD_HASHER } from '@/domain/ports/password-hasher.port';
import type { RoleRepository } from '@/domain/ports/role.repository';
import { ROLE_REPOSITORY } from '@/domain/ports/role.repository';
import type { SuperAdminQuery } from '@/domain/ports/super-admin.query';
import { SUPER_ADMIN_QUERY } from '@/domain/ports/super-admin.query';
import type { TeacherRepository } from '@/domain/ports/teacher.repository';
import { TEACHER_REPOSITORY } from '@/domain/ports/teacher.repository';
import type { TokenSigner } from '@/domain/ports/token-signer.port';
import { TOKEN_SIGNER } from '@/domain/ports/token-signer.port';
import type { TransactionRunner } from '@/domain/ports/transaction-runner.port';
import { TRANSACTION_RUNNER } from '@/domain/ports/transaction-runner.port';
import type { UserCompanyRepository } from '@/domain/ports/user-company.repository';
import { USER_COMPANY_REPOSITORY } from '@/domain/ports/user-company.repository';
import type { UserRepository } from '@/domain/ports/user.repository';
import { USER_REPOSITORY } from '@/domain/ports/user.repository';
import type { UserRoleRepository } from '@/domain/ports/user-role.repository';
import { USER_ROLE_REPOSITORY } from '@/domain/ports/user-role.repository';

import { BootstrapSuperAdminUseCase } from '@/application/use-cases/auth/bootstrap-super-admin.use-case';
import { LoginUseCase } from '@/application/use-cases/auth/login.use-case';
import { CompaniesCrud } from '@/application/use-cases/companies/companies.crud';
import { CreateCompanyUseCase } from '@/application/use-cases/companies/create-company.use-case';
import { EnterpriseAddAccessUserUseCase } from '@/application/use-cases/companies/enterprise-add-access-user.use-case';
import { RolesCrud } from '@/application/use-cases/roles/roles.crud';
import { TeachersCrud } from '@/application/use-cases/teachers/teachers.crud';
import { CreateTeacherUserUseCase } from '@/application/use-cases/users/create-teacher-user.use-case';
import { CreateUserWithRoleUseCase } from '@/application/use-cases/users/create-user-with-role.use-case';
import { UsersCrud } from '@/application/use-cases/users/users.crud';

@Module({
  providers: [
    {
      provide: RolesCrud,
      inject: [ROLE_REPOSITORY],
      useFactory: (repo: RoleRepository) => new RolesCrud(repo),
    },
    {
      provide: CompaniesCrud,
      inject: [COMPANY_REPOSITORY],
      useFactory: (repo: CompanyRepository) => new CompaniesCrud(repo),
    },
    {
      provide: UsersCrud,
      inject: [USER_REPOSITORY],
      useFactory: (repo: UserRepository) => new UsersCrud(repo),
    },
    {
      provide: TeachersCrud,
      inject: [TEACHER_REPOSITORY],
      useFactory: (repo: TeacherRepository) => new TeachersCrud(repo),
    },
    {
      provide: CreateUserWithRoleUseCase,
      inject: [TRANSACTION_RUNNER, ROLE_REPOSITORY, USER_REPOSITORY, USER_ROLE_REPOSITORY],
      useFactory: (tx: TransactionRunner, rolesRepo: RoleRepository, usersRepo: UserRepository, userRolesRepo: UserRoleRepository) =>
        new CreateUserWithRoleUseCase(tx, rolesRepo, usersRepo, userRolesRepo),
    },
    {
      provide: CreateTeacherUserUseCase,
      inject: [TRANSACTION_RUNNER, ROLE_REPOSITORY, USER_REPOSITORY, USER_ROLE_REPOSITORY, TEACHER_REPOSITORY],
      useFactory: (
        tx: TransactionRunner,
        rolesRepo: RoleRepository,
        usersRepo: UserRepository,
        userRolesRepo: UserRoleRepository,
        teachersRepo: TeacherRepository,
      ) => new CreateTeacherUserUseCase(tx, rolesRepo, usersRepo, userRolesRepo, teachersRepo),
    },
    {
      provide: CreateCompanyUseCase,
      inject: [
        TRANSACTION_RUNNER,
        COMPANY_REPOSITORY,
        ROLE_REPOSITORY,
        USER_REPOSITORY,
        USER_ROLE_REPOSITORY,
        USER_COMPANY_REPOSITORY,
        COMPANY_ACCESS_QUERY,
      ],
      useFactory: (
        tx: TransactionRunner,
        companyRepo: CompanyRepository,
        rolesRepo: RoleRepository,
        usersRepo: UserRepository,
        userRolesRepo: UserRoleRepository,
        userCompaniesRepo: UserCompanyRepository,
        accessQuery: CompanyAccessQuery,
      ) => new CreateCompanyUseCase(tx, companyRepo, rolesRepo, usersRepo, userRolesRepo, userCompaniesRepo, accessQuery),
    },
    {
      provide: EnterpriseAddAccessUserUseCase,
      inject: [TRANSACTION_RUNNER, COMPANY_REPOSITORY, ROLE_REPOSITORY, USER_REPOSITORY, USER_ROLE_REPOSITORY, USER_COMPANY_REPOSITORY],
      useFactory: (
        tx: TransactionRunner,
        companyRepo: CompanyRepository,
        rolesRepo: RoleRepository,
        usersRepo: UserRepository,
        userRolesRepo: UserRoleRepository,
        userCompaniesRepo: UserCompanyRepository,
      ) => new EnterpriseAddAccessUserUseCase(tx, companyRepo, rolesRepo, usersRepo, userRolesRepo, userCompaniesRepo),
    },
    {
      provide: LoginUseCase,
      inject: [AUTH_REPOSITORY, TOKEN_SIGNER, PASSWORD_HASHER],
      useFactory: (authRepo: AuthRepository, tokenSigner: TokenSigner, passwordHasher: PasswordHasherPort) =>
        new LoginUseCase(authRepo, tokenSigner, (hash, password) => passwordHasher.verify(hash, password)),
    },
    {
      provide: BootstrapSuperAdminUseCase,
      inject: [TRANSACTION_RUNNER, ROLE_REPOSITORY, USER_REPOSITORY, USER_ROLE_REPOSITORY, SUPER_ADMIN_QUERY],
      useFactory: (
        tx: TransactionRunner,
        rolesRepo: RoleRepository,
        usersRepo: UserRepository,
        userRolesRepo: UserRoleRepository,
        superAdminQuery: SuperAdminQuery,
      ) => new BootstrapSuperAdminUseCase(tx, rolesRepo, usersRepo, userRolesRepo, () => superAdminQuery.exists()),
    },
  ],
  exports: [
    RolesCrud,
    CompaniesCrud,
    UsersCrud,
    TeachersCrud,
    CreateUserWithRoleUseCase,
    CreateTeacherUserUseCase,
    CreateCompanyUseCase,
    EnterpriseAddAccessUserUseCase,
    LoginUseCase,
    BootstrapSuperAdminUseCase,
  ],
})
export class ApplicationModule {}

