import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

import { CreateUserWithRoleUseCase } from '@/application/use-cases/users/create-user-with-role.use-case';
import { CreateTeacherUserUseCase } from '@/application/use-cases/users/create-teacher-user.use-case';
import { UsersCrud } from '@/application/use-cases/users/users.crud';
import { PaginationDto } from '@/shared/pagination/pagination.dto';
import { JwtAuthGuard } from '@/entrypoints/http/auth/guards/jwt-auth.guard';
import { Roles } from '@/entrypoints/http/auth/guards/roles.decorator';
import { RolesGuard } from '@/entrypoints/http/auth/guards/roles.guard';
import type { JwtPayload } from '@/entrypoints/http/auth/jwt/jwt-payload';

import { CreateUserDto } from './dto/create-user.dto';
import { CreateTeacherUserDto } from './dto/create-teacher-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(
    private readonly crud: UsersCrud,
    private readonly createWithRole: CreateUserWithRoleUseCase,
    private readonly createTeacher: CreateTeacherUserUseCase,
  ) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({ type: UserResponseDto })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'ADMIN')
  create(@Body() dto: CreateUserDto, @Req() req: { user?: JwtPayload }) {
    const actor = req.user ?? { roles: [], companyId: null };
    return this.createWithRole.execute(dto, { roles: actor.roles, companyId: actor.companyId });
  }

  @Post('teachers')
  @ApiBody({ type: CreateTeacherUserDto })
  @ApiCreatedResponse({ type: UserResponseDto })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'ADMIN', 'SECRETARY')
  createTeacherUser(@Body() dto: CreateTeacherUserDto, @Req() req: { user?: JwtPayload }) {
    const actor = req.user ?? { roles: [] };
    return this.createTeacher.execute(dto, { roles: actor.roles });
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

