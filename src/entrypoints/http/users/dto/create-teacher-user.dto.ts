import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTeacherUserDto {
  @ApiProperty({ example: 'company_123' })
  @IsString()
  @MinLength(1)
  companyId!: string;

  @ApiProperty({ example: 'Ana' })
  @IsString()
  @MinLength(1)
  firstName!: string;

  @ApiProperty({ example: 'Souza' })
  @IsString()
  @MinLength(1)
  lastName!: string;

  @ApiProperty({ example: 'teacher@email.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ minLength: 6 })
  @IsString()
  @MinLength(6)
  password!: string;
}

