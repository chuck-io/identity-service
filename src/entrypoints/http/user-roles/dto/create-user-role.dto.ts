import { IsUUID } from 'class-validator';

export class CreateUserRoleDto {
  @IsUUID()
  userUuid!: string;

  @IsUUID()
  roleUuid!: string;
}

