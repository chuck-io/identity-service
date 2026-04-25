import { Body, Controller, Delete, Get, Inject, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';

import type { CompanyRepository } from '../../../application/ports/company.repository';
import { COMPANY_REPOSITORY } from '../../../application/ports/company.repository';
import { CompaniesCrud } from '../../../application/use-cases/companies/companies.crud';
import { PaginationDto } from '../../../shared/pagination/pagination.dto';

import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('companies')
@ApiTags('companies')
export class CompaniesController {
  private readonly crud: CompaniesCrud;

  constructor(@Inject(COMPANY_REPOSITORY) repo: CompanyRepository) {
    this.crud = new CompaniesCrud(repo);
  }

  @Post()
  create(@Body() dto: CreateCompanyDto) {
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
  update(@Param('uuid', ParseUUIDPipe) uuid: string, @Body() dto: UpdateCompanyDto) {
    return this.crud.updateByUuid(uuid, dto);
  }

  @Delete(':uuid')
  @ApiParam({ name: 'uuid', type: 'string', format: 'uuid' })
  remove(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.crud.deleteByUuid(uuid);
  }
}

