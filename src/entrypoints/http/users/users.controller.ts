import { Body, Controller, Delete, Get, Inject, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

import type { UserRepository } from '../../../application/ports/user.repository';
import { USER_REPOSITORY } from '../../../application/ports/user.repository';
import { UsersCrud } from '../../../application/use-cases/users/users.crud';
import { PaginationDto } from '../../../shared/pagination/pagination.dto';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
  private readonly crud: UsersCrud;

  constructor(@Inject(USER_REPOSITORY) repo: UserRepository) {
    this.crud = new UsersCrud(repo);
  }

  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({ type: UserResponseDto })
  create(@Body() dto: CreateUserDto) {
    return this.crud.create(dto);
  }

  @Get()
  @ApiOkResponse({ type: [UserResponseDto] })
  findAll(@Query() pagination: PaginationDto) {
    return this.crud.findAll(pagination);
  }

  @Get(':uuid')
  @ApiParam({ name: 'uuid', type: 'string', format: 'uuid' })
  @ApiOkResponse({ type: UserResponseDto })
  findOne(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.crud.findByUuid(uuid);
  }

  @Patch(':uuid')
  @ApiParam({ name: 'uuid', type: 'string', format: 'uuid' })
  @ApiBody({ type: UpdateUserDto })
  @ApiOkResponse({ type: UserResponseDto })
  update(@Param('uuid', ParseUUIDPipe) uuid: string, @Body() dto: UpdateUserDto) {
    return this.crud.updateByUuid(uuid, dto);
  }

  @Delete(':uuid')
  @ApiParam({ name: 'uuid', type: 'string', format: 'uuid' })
  @ApiOkResponse({ type: UserResponseDto })
  remove(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.crud.deleteByUuid(uuid);
  }
}

