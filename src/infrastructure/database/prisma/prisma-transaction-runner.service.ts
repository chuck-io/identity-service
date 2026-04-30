import { Injectable } from '@nestjs/common';

import type { TransactionRunner } from '../../../application/ports/transaction-runner.port';
import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaTransactionRunner implements TransactionRunner {
  constructor(private readonly prisma: PrismaService) {}

  run<T>(fn: () => Promise<T>): Promise<T> {
    return this.prisma.$transaction(fn);
  }
}

