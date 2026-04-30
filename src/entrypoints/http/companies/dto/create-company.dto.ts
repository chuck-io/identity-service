import { IsOptional, IsString, MinLength, ValidateNested } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { DefaultCompanyUserDto } from './default-company-user.dto';

export class CreateCompanyDto {
  @ApiProperty({ example: 'company_123', minLength: 1 })
  @IsString()
  @MinLength(1)
  companyId!: string;

  @ApiProperty({ example: 'ACME LTDA', minLength: 1 })
  @IsString()
  @MinLength(1)
  name!: string;

  @ApiProperty({ example: '12.345.678/0001-90', minLength: 1 })
  @IsString()
  @MinLength(1)
  companyRegistrationNumber!: string;

  @ApiPropertyOptional({
    description: 'Default login user for the company (ENTRERPRISE role). If omitted, only ADMIN can create companies without default user.',
    type: DefaultCompanyUserDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => DefaultCompanyUserDto)
  defaultUser?: DefaultCompanyUserDto;
}

