import { Body, Controller, Delete, Get, Inject, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';

import type { UserRoleRepository } from '../../../application/ports/user-role.repository';
import { USER_ROLE_REPOSITORY } from '../../../application/ports/user-role.repository';
import { UserRolesCrud } from '../../../application/use-cases/user-roles/user-roles.crud';
import { PaginationDto } from '../../../shared/pagination/pagination.dto';

import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';

@Controller('user-roles')
@ApiTags('user-roles')
export class UserRolesController {
  private readonly crud: UserRolesCrud;

  constructor(@Inject(USER_ROLE_REPOSITORY) repo: UserRoleRepository) {
    this.crud = new UserRolesCrud(repo);
  }

  @Post()
  create(@Body() dto: CreateUserRoleDto) {
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
  update(@Param('uuid', ParseUUIDPipe) uuid: string, @Body() dto: UpdateUserRoleDto) {
    return this.crud.updateByUuid(uuid, dto);
  }

  @Delete(':uuid')
  @ApiParam({ name: 'uuid', type: 'string', format: 'uuid' })
  remove(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.crud.deleteByUuid(uuid);
  }
}

