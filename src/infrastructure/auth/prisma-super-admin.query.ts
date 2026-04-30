import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class PrismaSuperAdminQuery {
  constructor(private readonly prisma: PrismaService) {}

  async exists(): Promise<boolean> {
    const found = await this.prisma.userRole.findFirst({
      where: { role: { name: 'SUPER_ADMIN' } },
      select: { uuid: true },
    });
    return Boolean(found);
  }
}

