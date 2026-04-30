import { Injectable } from '@nestjs/common';

import type {
  CompanyCreateInput,
  CompanyRepository,
  CompanyUpdateInput,
} from '@/domain/ports/company.repository';
import { PrismaService } from '@/infrastructure/database/prisma/prisma.service';

@Injectable()
export class PrismaCompanyRepository implements CompanyRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(input: CompanyCreateInput) {
    return this.prisma.company.create({
      data: input,
      select: {
        uuid: true,
        companyId: true,
        name: true,
        companyRegistrationNumber: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  findAll(pagination?: { skip?: number; take?: number }) {
    return this.prisma.company.findMany({
      skip: pagination?.skip,
      take: pagination?.take,
      orderBy: { id: 'asc' },
      select: {
        uuid: true,
        companyId: true,
        name: true,
        companyRegistrationNumber: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  findByUuid(uuid: string) {
    return this.prisma.company.findUnique({
      where: { uuid },
      select: {
        uuid: true,
        companyId: true,
        name: true,
        companyRegistrationNumber: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  updateByUuid(uuid: string, input: CompanyUpdateInput) {
    return this.prisma.company.update({
      where: { uuid },
      data: input,
      select: {
        uuid: true,
        companyId: true,
        name: true,
        companyRegistrationNumber: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  deleteByUuid(uuid: string) {
    return this.prisma.company.delete({
      where: { uuid },
      select: {
        uuid: true,
        companyId: true,
        name: true,
        companyRegistrationNumber: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}

