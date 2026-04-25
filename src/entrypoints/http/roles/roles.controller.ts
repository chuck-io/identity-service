import { Body, Controller, Delete, Get, Inject, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

import type { RoleRepository } from '../../../application/ports/role.repository';
import { ROLE_REPOSITORY } from '../../../application/ports/role.repository';
import { RolesCrud } from '../../../application/use-cases/roles/roles.crud';
import { PaginationDto } from '../../../shared/pagination/pagination.dto';

import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleResponseDto } from './dto/role-response.dto';

@Controller('roles')
@ApiTags('roles')
export class RolesController {
  private readonly crud: RolesCrud;

  constructor(@Inject(ROLE_REPOSITORY) repo: RoleRepository) {
    this.crud = new RolesCrud(repo);
  }

  @Post()
  @ApiBody({ type: CreateRoleDto })
  @ApiCreatedResponse({ type: RoleResponseDto })
  create(@Body() dto: CreateRoleDto) {
    return this.crud.create(dto);
  }

  @Get()
  @ApiOkResponse({ type: [RoleResponseDto] })
  findAll(@Query() pagination: PaginationDto) {
    return this.crud.findAll(pagination);
  }

  @Get(':uuid')
  @ApiParam({ name: 'uuid', type: 'string', format: 'uuid' })
  @ApiOkResponse({ type: RoleResponseDto })
  findOne(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.crud.findByUuid(uuid);
  }

  @Patch(':uuid')
  @ApiParam({ name: 'uuid', type: 'string', format: 'uuid' })
  @ApiBody({ type: UpdateRoleDto })
  @ApiOkResponse({ type: RoleResponseDto })
  update(@Param('uuid', ParseUUIDPipe) uuid: string, @Body() dto: UpdateRoleDto) {
    return this.crud.updateByUuid(uuid, dto);
  }

  @Delete(':uuid')
  @ApiParam({ name: 'uuid', type: 'string', format: 'uuid' })
  @ApiOkResponse({ type: RoleResponseDto })
  remove(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.crud.deleteByUuid(uuid);
  }
}

