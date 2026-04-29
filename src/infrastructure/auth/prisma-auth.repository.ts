import { Injectable } from '@nestjs/common';

import type { AuthRepository } from '../../application/ports/auth.repository';
import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class PrismaAuthRepository implements AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUserForLoginByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: {
        uuid: true,
        email: true,
        password: true,
      },
    });

    if (!user) return null;

    return {
      uuid: user.uuid,
      email: user.email,
      passwordHash: user.password,
    };
  }
}

