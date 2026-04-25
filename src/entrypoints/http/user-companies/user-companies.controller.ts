import { Body, Controller, Delete, Get, Inject, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';

import type { UserCompanyRepository } from '../../../application/ports/user-company.repository';
import { USER_COMPANY_REPOSITORY } from '../../../application/ports/user-company.repository';
import { UserCompaniesCrud } from '../../../application/use-cases/user-companies/user-companies.crud';
import { PaginationDto } from '../../../shared/pagination/pagination.dto';

import { CreateUserCompanyDto } from './dto/create-user-company.dto';
import { UpdateUserCompanyDto } from './dto/update-user-company.dto';

@Controller('user-companies')
@ApiTags('user-companies')
export class UserCompaniesController {
  private readonly crud: UserCompaniesCrud;

  constructor(@Inject(USER_COMPANY_REPOSITORY) repo: UserCompanyRepository) {
    this.crud = new UserCompaniesCrud(repo);
  }

  @Post()
  create(@Body() dto: CreateUserCompanyDto) {
    return this.crud.create(dto);
  }

  @Get()
  findAll(@Query() pagination: PaginationDto) {
    return this.crud.findAll(pagination);
  }

  @Get(':uuid')
  @ApiParam({ name: 'uuid', type: 'string', format: 'uuid' })
  findOne(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.crud.findByUuid(uuid);
  }

  @Patch(':uuid')
  @ApiParam({ name: 'uuid', type: 'string', format: 'uuid' })
  update(@Param('uuid', ParseUUIDPipe) uuid: string, @Body() dto: UpdateUserCompanyDto) {
    return this.crud.updateByUuid(uuid, dto);
  }

  @Delete(':uuid')
  @ApiParam({ name: 'uuid', type: 'string', format: 'uuid' })
  remove(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.crud.deleteByUuid(uuid);
  }
}

