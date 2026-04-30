import { Body, Controller, Delete, Get, Inject, Param, ParseUUIDPipe, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

import type { CompanyRepository } from '../../../application/ports/company.repository';
import { COMPANY_REPOSITORY } from '../../../application/ports/company.repository';
import type { RoleRepository } from '../../../application/ports/role.repository';
import { ROLE_REPOSITORY } from '../../../application/ports/role.repository';
import type { UserRepository } from '../../../application/ports/user.repository';
import { USER_REPOSITORY } from '../../../application/ports/user.repository';
import type { UserRoleRepository } from '../../../application/ports/user-role.repository';
import { USER_ROLE_REPOSITORY } from '../../../application/ports/user-role.repository';
import type { UserCompanyRepository } from '../../../application/ports/user-company.repository';
import { USER_COMPANY_REPOSITORY } from '../../../application/ports/user-company.repository';
import type { TransactionRunner } from '../../../application/ports/transaction-runner.port';
import { TRANSACTION_RUNNER } from '../../../application/ports/transaction-runner.port';
import type { CompanyAccessQuery } from '../../../application/ports/company-access.query';
import { COMPANY_ACCESS_QUERY } from '../../../application/ports/company-access.query';
import { CreateCompanyUseCase } from '../../../application/use-cases/companies/create-company.use-case';
import { EnterpriseAddAccessUserUseCase } from '../../../application/use-cases/companies/enterprise-add-access-user.use-case';
import { CompaniesCrud } from '../../../application/use-cases/companies/companies.crud';
import { PaginationDto } from '../../../shared/pagination/pagination.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/guards/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import type { JwtPayload } from '../auth/jwt/jwt-payload';

import { CreateCompanyDto } from './dto/create-company.dto';
import { DefaultCompanyUserDto } from './dto/default-company-user.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompanyResponseDto } from './dto/company-response.dto';

@Controller('companies')
@ApiTags('companies')
export class CompaniesController {
  private readonly crud: CompaniesCrud;
  private readonly createCompany: CreateCompanyUseCase;
  private readonly enterpriseAddAccess: EnterpriseAddAccessUserUseCase;

  constructor(
    @Inject(COMPANY_REPOSITORY) repo: CompanyRepository,
    @Inject(TRANSACTION_RUNNER) tx: TransactionRunner,
    @Inject(ROLE_REPOSITORY) rolesRepo: RoleRepository,
    @Inject(USER_REPOSITORY) usersRepo: UserRepository,
    @Inject(USER_ROLE_REPOSITORY) userRolesRepo: UserRoleRepository,
    @Inject(USER_COMPANY_REPOSITORY) userCompaniesRepo: UserCompanyRepository,
    @Inject(COMPANY_ACCESS_QUERY) accessQuery: CompanyAccessQuery,
  ) {
    this.crud = new CompaniesCrud(repo);
    this.createCompany = new CreateCompanyUseCase(tx, repo, rolesRepo, usersRepo, userRolesRepo, userCompaniesRepo, accessQuery);
    this.enterpriseAddAccess = new EnterpriseAddAccessUserUseCase(tx, repo, rolesRepo, usersRepo, userRolesRepo, userCompaniesRepo);
  }

  @Post()
  @ApiBody({ type: CreateCompanyDto })
  @ApiCreatedResponse({ type: CompanyResponseDto })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'ADMIN')
  async create(@Body() dto: CreateCompanyDto, @Req() req: { user?: JwtPayload }) {
    const actor = req.user ?? { roles: [] };
    const result = await this.createCompany.execute(dto, { roles: actor.roles });
    return result.company;
  }

  @Post(':uuid/default-user')
  @ApiParam({ name: 'uuid', type: 'string', format: 'uuid' })
  @ApiBody({ type: DefaultCompanyUserDto })
  @ApiCreatedResponse({ type: CompanyResponseDto })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async addDefaultUser(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() dto: DefaultCompanyUserDto,
    @Req() req: { user?: JwtPayload },
  ) {
    const actor = req.user ?? { roles: [] };
    const result = await this.createCompany.addDefaultUser(uuid, dto, { roles: actor.roles });
    return result.company;
  }

  @Post(':uuid/users')
  @ApiParam({ name: 'uuid', type: 'string', format: 'uuid' })
  @ApiBody({ type: DefaultCompanyUserDto })
  @ApiCreatedResponse({ type: CompanyResponseDto })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ENTRERPRISE')
  addAccessUser(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() dto: DefaultCompanyUserDto,
    @Req() req: { user?: JwtPayload },
  ) {
    const actor = req.user ?? { roles: [], companyId: null };
    return this.enterpriseAddAccess.execute(uuid, dto, { roles: actor.roles, companyId: actor.companyId });
  }

  @Get()
  @ApiOkResponse({ type: [CompanyResponseDto] })
  findAll(@Query() pagination: PaginationDto) {
    return this.crud.findAll(pagination);
  }

  @Get(':uuid')
  @ApiParam({ name: 'uuid', type: 'string', format: 'uuid' })
  @ApiOkResponse({ type: CompanyResponseDto })
  findOne(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.crud.findByUuid(uuid);
  }

  @Patch(':uuid')
  @ApiParam({ name: 'uuid', type: 'string', format: 'uuid' })
  @ApiBody({ type: UpdateCompanyDto })
  @ApiOkResponse({ type: CompanyResponseDto })
  update(@Param('uuid', ParseUUIDPipe) uuid: string, @Body() dto: UpdateCompanyDto) {
    return this.crud.updateByUuid(uuid, dto);
  }

  @Delete(':uuid')
  @ApiParam({ name: 'uuid', type: 'string', format: 'uuid' })
  @ApiOkResponse({ type: CompanyResponseDto })
  remove(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.crud.deleteByUuid(uuid);
  }
}

