import { ApiProperty } from '@nestjs/swagger';

export class BootstrapSuperAdminResponseDto {
  @ApiProperty({ format: 'uuid' })
  uuid!: string;

  @ApiProperty()
  email!: string;
}

