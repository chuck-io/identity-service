import { Body, Controller, Headers, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { BootstrapSuperAdminUseCase } from '@/application/use-cases/auth/bootstrap-super-admin.use-case';
import { UnauthorizedError } from '@/application/shared/errors/unauthorized.error';

import { BootstrapSuperAdminDto } from './dto/bootstrap-super-admin.dto';
import { BootstrapSuperAdminResponseDto } from './dto/bootstrap-super-admin-response.dto';

@Controller('auth')
@ApiTags('auth')
export class BootstrapSuperAdminController {
  constructor(
    private readonly config: ConfigService,
    private readonly bootstrap: BootstrapSuperAdminUseCase,
  ) {}

  @Post('bootstrap/super-admin')
  @ApiBody({ type: BootstrapSuperAdminDto })
  @ApiCreatedResponse({ type: BootstrapSuperAdminResponseDto })
  bootstrapSuperAdmin(
    @Body() dto: BootstrapSuperAdminDto,
    @Headers('x-bootstrap-token') token: string | undefined,
  ) {
    const expected = this.config.get<string>('BOOTSTRAP_TOKEN');
    if (!expected || token !== expected) {
      // intentionally vague
      throw new UnauthorizedError('Invalid bootstrap token');
    }
    return this.bootstrap.execute(dto);
  }
}
