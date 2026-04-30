import { Body, Controller, Headers, Inject, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import type { RoleRepository } from '../../../application/ports/role.repository';
import { ROLE_REPOSITORY } from '../../../application/ports/role.repository';
import type { TransactionRunner } from '../../../application/ports/transaction-runner.port';
import { TRANSACTION_RUNNER } from '../../../application/ports/transaction-runner.port';
import type { UserRoleRepository } from '../../../application/ports/user-role.repository';
import { USER_ROLE_REPOSITORY } from '../../../application/ports/user-role.repository';
import type { UserRepository } from '../../../application/ports/user.repository';
import { USER_REPOSITORY } from '../../../application/ports/user.repository';
import { BootstrapSuperAdminUseCase } from '../../../application/use-cases/auth/bootstrap-super-admin.use-case';
import { UnauthorizedError } from '../../../application/shared/errors/unauthorized.error';
import { PrismaSuperAdminQuery } from '../../../infrastructure/auth/prisma-super-admin.query';

import { BootstrapSuperAdminDto } from './dto/bootstrap-super-admin.dto';
import { BootstrapSuperAdminResponseDto } from './dto/bootstrap-super-admin-response.dto';

@Controller('auth')
@ApiTags('auth')
export class BootstrapSuperAdminController {
  private readonly bootstrap: BootstrapSuperAdminUseCase;
  private readonly config: ConfigService;

  constructor(
    config: ConfigService,
    @Inject(TRANSACTION_RUNNER) tx: TransactionRunner,
    @Inject(ROLE_REPOSITORY) rolesRepo: RoleRepository,
    @Inject(USER_REPOSITORY) usersRepo: UserRepository,
    @Inject(USER_ROLE_REPOSITORY) userRolesRepo: UserRoleRepository,
    superAdminQuery: PrismaSuperAdminQuery,
  ) {
    this.config = config;

    this.bootstrap = new BootstrapSuperAdminUseCase(
      tx,
      rolesRepo,
      usersRepo,
      userRolesRepo,
      () => superAdminQuery.exists(),
    );
  }

  @Post('bootstrap/super-admin')
  @ApiBody({ type: BootstrapSuperAdminDto })
  @ApiCreatedResponse({ type: BootstrapSuperAdminResponseDto })
  bootstrapSuperAdmin(
    @Body() dto: BootstrapSuperAdminDto,
    @Headers('x-bootstrap-token') token: string | undefined,
  ) {
    const expected = this.config.get<string>('BOOTSTRAP_TOKEN');
    if (!expected || token !== expected) {
      // intentionally vague
      throw new UnauthorizedError('Invalid bootstrap token');
    }
    return this.bootstrap.execute(dto);
  }
}
