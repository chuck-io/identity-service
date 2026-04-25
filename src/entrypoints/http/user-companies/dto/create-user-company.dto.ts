import { IsUUID } from 'class-validator';

export class CreateUserCompanyDto {
  @IsUUID()
  userUuid!: string;

  @IsUUID()
  companyUuid!: string;
}

