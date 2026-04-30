import { Global, Module } from '@nestjs/common';

import { PrismaService } from './prisma.service';
import { PrismaTransactionRunner } from './prisma-transaction-runner.service';
import { DataEncryptionService } from '../../security/crypto/data-encryption.service';
import { PasswordHasherService } from '../../security/password/password-hasher.service';
import { TRANSACTION_RUNNER } from '../../../application/ports/transaction-runner.port';

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

