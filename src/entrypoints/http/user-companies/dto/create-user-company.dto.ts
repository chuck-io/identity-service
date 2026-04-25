import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserCompanyDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  userUuid!: string;

  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  companyUuid!: string;
}

