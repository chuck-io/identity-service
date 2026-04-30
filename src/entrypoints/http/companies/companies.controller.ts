import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

import { CreateCompanyUseCase } from '@/application/use-cases/companies/create-company.use-case';
import { EnterpriseAddAccessUserUseCase } from '@/application/use-cases/companies/enterprise-add-access-user.use-case';
import { CompaniesCrud } from '@/application/use-cases/companies/companies.crud';
import { PaginationDto } from '@/shared/pagination/pagination.dto';
import { JwtAuthGuard } from '@/entrypoints/http/auth/guards/jwt-auth.guard';
import { Roles } from '@/entrypoints/http/auth/guards/roles.decorator';
import { RolesGuard } from '@/entrypoints/http/auth/guards/roles.guard';
import type { JwtPayload } from '@/entrypoints/http/auth/jwt/jwt-payload';

import { CreateCompanyDto } from './dto/create-company.dto';
import { DefaultCompanyUserDto } from './dto/default-company-user.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompanyResponseDto } from './dto/company-response.dto';

@Controller('companies')
@ApiTags('companies')
export class CompaniesController {
  constructor(
    private readonly crud: CompaniesCrud,
    private readonly createCompany: CreateCompanyUseCase,
    private readonly enterpriseAddAccess: EnterpriseAddAccessUserUseCase,
  ) {}

  @Post()
  @ApiBody({ type: CreateCompanyDto })
  @ApiCreatedResponse({ type: CompanyResponseDto })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'ADMIN')
  async create(@Body() dto: CreateCompanyDto, @Req() req: { user?: JwtPayload }) {
    const actor = req.user ?? { roles: [] };
    const result = await this.createCompany.execute(dto, { roles: actor.roles });
    return result.company;
  }

  @Post(':uuid/users')
  @ApiParam({ name: 'uuid', type: 'string', format: 'uuid' })
  @ApiBody({ type: DefaultCompanyUserDto })
  @ApiCreatedResponse({ type: CompanyResponseDto })
  @ApiBearerAuth('access-token')
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

