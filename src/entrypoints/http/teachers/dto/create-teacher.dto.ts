import { IsString, IsUUID, MinLength } from 'class-validator';

export class CreateTeacherDto {
  @IsUUID()
  userUuid!: string;

  @IsString()
  @MinLength(1)
  subject!: string;
}

