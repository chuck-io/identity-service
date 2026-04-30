import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

import { TeachersCrud } from '@/application/use-cases/teachers/teachers.crud';
import { PaginationDto } from '@/shared/pagination/pagination.dto';

import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { TeacherResponseDto } from './dto/teacher-response.dto';

@Controller('teachers')
@ApiTags('teachers')
export class TeachersController {
  constructor(private readonly crud: TeachersCrud) {}

  @Post()
  @ApiBody({ type: CreateTeacherDto })
  @ApiCreatedResponse({ type: TeacherResponseDto })
  create(@Body() dto: CreateTeacherDto) {
    return this.crud.create(dto);
  }

  @Get()
  @ApiOkResponse({ type: [TeacherResponseDto] })
  findAll(@Query() pagination: PaginationDto) {
    return this.crud.findAll(pagination);
  }

  @Get(':uuid')
  @ApiParam({ name: 'uuid', type: 'string', format: 'uuid' })
  @ApiOkResponse({ type: TeacherResponseDto })
  findOne(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.crud.findByUuid(uuid);
  }

  @Patch(':uuid')
  @ApiParam({ name: 'uuid', type: 'string', format: 'uuid' })
  @ApiBody({ type: UpdateTeacherDto })
  @ApiOkResponse({ type: TeacherResponseDto })
  update(@Param('uuid', ParseUUIDPipe) uuid: string, @Body() dto: UpdateTeacherDto) {
    return this.crud.updateByUuid(uuid, dto);
  }

  @Delete(':uuid')
  @ApiParam({ name: 'uuid', type: 'string', format: 'uuid' })
  @ApiOkResponse({ type: TeacherResponseDto })
  remove(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.crud.deleteByUuid(uuid);
  }
}

