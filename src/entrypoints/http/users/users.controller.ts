import { Body, Controller, Delete, Get, Inject, Param, ParseUUIDPipe, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

import type { UserRepository } from '../../../application/ports/user.repository';
import { USER_REPOSITORY } from '../../../application/ports/user.repository';
import type { RoleRepository } from '../../../application/ports/role.repository';
import { ROLE_REPOSITORY } from '../../../application/ports/role.repository';
import type { UserRoleRepository } from '../../../application/ports/user-role.repository';
import { USER_ROLE_REPOSITORY } from '../../../application/ports/user-role.repository';
import type { TransactionRunner } from '../../../application/ports/transaction-runner.port';
import { TRANSACTION_RUNNER } from '../../../application/ports/transaction-runner.port';
import { CreateUserWithRoleUseCase } from '../../../application/use-cases/users/create-user-with-role.use-case';
import type { TeacherRepository } from '../../../application/ports/teacher.repository';
import { TEACHER_REPOSITORY } from '../../../application/ports/teacher.repository';
import { CreateTeacherUserUseCase } from '../../../application/use-cases/users/create-teacher-user.use-case';
import { UsersCrud } from '../../../application/use-cases/users/users.crud';
import { PaginationDto } from '../../../shared/pagination/pagination.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/guards/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import type { JwtPayload } from '../auth/jwt/jwt-payload';

import { CreateUserDto } from './dto/create-user.dto';
import { CreateTeacherUserDto } from './dto/create-teacher-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
  private readonly crud: UsersCrud;
  private readonly createWithRole: CreateUserWithRoleUseCase;
  private readonly createTeacher: CreateTeacherUserUseCase;

  constructor(
    @Inject(USER_REPOSITORY) repo: UserRepository,
    @Inject(TRANSACTION_RUNNER) tx: TransactionRunner,
    @Inject(ROLE_REPOSITORY) rolesRepo: RoleRepository,
    @Inject(USER_ROLE_REPOSITORY) userRolesRepo: UserRoleRepository,
    @Inject(TEACHER_REPOSITORY) teachersRepo: TeacherRepository,
  ) {
    this.crud = new UsersCrud(repo);
    this.createWithRole = new CreateUserWithRoleUseCase(tx, rolesRepo, repo, userRolesRepo);
    this.createTeacher = new CreateTeacherUserUseCase(tx, rolesRepo, repo, userRolesRepo, teachersRepo);
  }

  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({ type: UserResponseDto })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'ADMIN')
  create(@Body() dto: CreateUserDto, @Req() req: { user?: JwtPayload }) {
    const actor = req.user ?? { roles: [], companyId: null };
    return this.createWithRole.execute(dto, { roles: actor.roles, companyId: actor.companyId });
  }

  @Post('teachers')
  @ApiBody({ type: CreateTeacherUserDto })
  @ApiCreatedResponse({ type: UserResponseDto })
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

