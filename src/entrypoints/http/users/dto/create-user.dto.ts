import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiPropertyOptional({ example: 'company_123' })
  @IsOptional()
  @IsString()
  @MinLength(1)
  companyId?: string;

  @ApiProperty({ example: 'Lucas', minLength: 1 })
  @IsString()
  @MinLength(1)
  firstName!: string;

  @ApiProperty({ example: 'Silva', minLength: 1 })
  @IsString()
  @MinLength(1)
  lastName!: string;

  @ApiProperty({ example: 'lucas@email.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'strong_password', minLength: 6 })
  @IsString()
  @MinLength(6)
  password!: string;
}

