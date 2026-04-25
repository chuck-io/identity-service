import { IsString, IsUUID, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTeacherDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  userUuid!: string;

  @ApiProperty({ example: 'Math', minLength: 1 })
  @IsString()
  @MinLength(1)
  subject!: string;
}

