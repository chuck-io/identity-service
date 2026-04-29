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

  @ApiPropertyOptional({
    example: '123.456.789-09',
    description: 'CPF / person registration number (will be encrypted at rest)',
  })
  @IsOptional()
  @IsString()
  @MinLength(5)
  personRegistrationNumber?: string;
}

