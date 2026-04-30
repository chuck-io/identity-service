import { Injectable } from '@nestjs/common';

import type { CompanyAccessQuery } from '@/domain/ports/company-access.query';
import { PrismaService } from '@/infrastructure/database/prisma/prisma.service';

@Injectable()
export class PrismaCompanyAccessQuery implements CompanyAccessQuery {
  constructor(private readonly prisma: PrismaService) {}

  async companyHasEnterpriseUser(companyUuid: string): Promise<boolean> {
    const found = await this.prisma.userCompany.findFirst({
      where: {
        company: { uuid: companyUuid },
        user: { roles: { some: { role: { name: 'ENTRERPRISE' } } } },
      },
      select: { uuid: true },
    });

    return Boolean(found);
  }
}

