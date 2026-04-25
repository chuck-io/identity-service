import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserRoleDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  userUuid!: string;

  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  roleUuid!: string;
}

