import { Injectable } from '@nestjs/common';

import type { AuthRepository } from '@/domain/ports/auth.repository';
import { PrismaService } from '@/infrastructure/database/prisma/prisma.service';

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
        companyId: true,
        roles: {
          select: {
            role: { select: { name: true } },
          },
        },
      },
    });

    if (!user) return null;

    return {
      uuid: user.uuid,
      email: user.email,
      passwordHash: user.password,
      roles: user.roles.map((ur) => ur.role.name),
      companyId: user.companyId,
    };
  }
}

