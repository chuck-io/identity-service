import { ApiProperty } from '@nestjs/swagger';

export class UserCompanyResponseDto {
  @ApiProperty({ format: 'uuid' })
  uuid!: string;

  @ApiProperty({ format: 'uuid' })
  userUuid!: string;

  @ApiProperty({ format: 'uuid' })
  companyUuid!: string;

  @ApiProperty({ type: String, format: 'date-time' })
  createdAt!: Date;

  @ApiProperty({ type: String, format: 'date-time' })
  updatedAt!: Date;
}

