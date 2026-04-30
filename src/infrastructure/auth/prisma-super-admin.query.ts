import { Injectable } from '@nestjs/common';

import type { SuperAdminQuery } from '@/domain/ports/super-admin.query';
import { PrismaService } from '@/infrastructure/database/prisma/prisma.service';

@Injectable()
export class PrismaSuperAdminQuery implements SuperAdminQuery {
  constructor(private readonly prisma: PrismaService) {}

  async exists(): Promise<boolean> {
    const found = await this.prisma.userRole.findFirst({
      where: { role: { name: 'SUPER_ADMIN' } },
      select: { uuid: true },
    });
    return Boolean(found);
  }
}

