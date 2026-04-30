import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { LoginUseCase } from '@/application/use-cases/auth/login.use-case';

import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly login: LoginUseCase) {}

  @Post('login')
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({ type: LoginResponseDto })
  loginUser(@Body() dto: LoginDto) {
    return this.login.execute(dto);
  }
}

