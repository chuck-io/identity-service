import { Global, Module } from '@nestjs/common';

import { DataEncryptionService } from '@/infrastructure/security/crypto/data-encryption.service';
import { PasswordHasherService } from '@/infrastructure/security/password/password-hasher.service';
import { PrismaService } from '@/infrastructure/database/prisma/prisma.service';
import { PrismaTransactionRunner } from '@/infrastructure/database/prisma/prisma-transaction-runner.service';
import { TRANSACTION_RUNNER } from '@/domain/ports/transaction-runner.port';

@Global()
@Module({
  providers: [
    DataEncryptionService,
    PasswordHasherService,
    PrismaService,
    PrismaTransactionRunner,
    {
      provide: TRANSACTION_RUNNER,
      useExisting: PrismaTransactionRunner,
    },
  ],
  exports: [PrismaService, DataEncryptionService, PasswordHasherService, TRANSACTION_RUNNER],
})
export class PrismaModule {}

