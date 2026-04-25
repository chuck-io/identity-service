import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
}

