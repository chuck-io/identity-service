import { Global, Module } from '@nestjs/common';

import { PrismaService } from './prisma.service';
import { DataEncryptionService } from '../../security/crypto/data-encryption.service';
import { PasswordHasherService } from '../../security/password/password-hasher.service';

@Global()
@Module({
  providers: [DataEncryptionService, PasswordHasherService, PrismaService],
  exports: [PrismaService, DataEncryptionService, PasswordHasherService],
})
export class PrismaModule {}

