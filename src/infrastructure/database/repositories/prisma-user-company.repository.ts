import { Injectable } from '@nestjs/common';

import type {
  UserCompanyCreateInput,
  UserCompanyRepository,
  UserCompanyUpdateInput,
  UserCompanyView,
} from '@/domain/ports/user-company.repository';
import { PrismaService } from '@/infrastructure/database/prisma/prisma.service';

@Injectable()
export class PrismaUserCompanyRepository implements UserCompanyRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(input: UserCompanyCreateInput) {
    return this.prisma.userCompany
      .create({
      data: {
        user: { connect: { uuid: input.userUuid } },
        company: { connect: { uuid: input.companyUuid } },
      },
      select: {
        uuid: true,
        createdAt: true,
        updatedAt: true,
        user: { select: { uuid: true } },
        company: { select: { uuid: true } },
      },
      })
      .then((row): UserCompanyView => ({
        uuid: row.uuid,
        userUuid: row.user.uuid,
        companyUuid: row.company.uuid,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
      }));
  }

  findAll(pagination?: { skip?: number; take?: number }) {
    return this.prisma.userCompany
      .findMany({
      skip: pagination?.skip,
      take: pagination?.take,
      orderBy: { id: 'asc' },
      select: {
        uuid: true,
        createdAt: true,
        updatedAt: true,
        user: { select: { uuid: true } },
        company: { select: { uuid: true } },
      },
      })
      .then(
        (rows): UserCompanyView[] =>
          rows.map((row) => ({
            uuid: row.uuid,
            userUuid: row.user.uuid,
            companyUuid: row.company.uuid,
            createdAt: row.createdAt,
            updatedAt: row.updatedAt,
          })),
      );
  }

  findByUuid(uuid: string) {
    return this.prisma.userCompany
      .findUnique({
      where: { uuid },
      select: {
        uuid: true,
        createdAt: true,
        updatedAt: true,
        user: { select: { uuid: true } },
        company: { select: { uuid: true } },
      },
      })
      .then((row): UserCompanyView | null =>
        row
          ? {
              uuid: row.uuid,
              userUuid: row.user.uuid,
              companyUuid: row.company.uuid,
              createdAt: row.createdAt,
              updatedAt: row.updatedAt,
            }
          : null,
      );
  }

  updateByUuid(uuid: string, input: UserCompanyUpdateInput) {
    return this.prisma.userCompany
      .update({
      where: { uuid },
      data: {
        ...(input.userUuid ? { user: { connect: { uuid: input.userUuid } } } : {}),
        ...(input.companyUuid ? { company: { connect: { uuid: input.companyUuid } } } : {}),
      },
      select: {
        uuid: true,
        createdAt: true,
        updatedAt: true,
        user: { select: { uuid: true } },
        company: { select: { uuid: true } },
      },
      })
      .then((row): UserCompanyView => ({
        uuid: row.uuid,
        userUuid: row.user.uuid,
        companyUuid: row.company.uuid,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
      }));
  }

  deleteByUuid(uuid: string) {
    return this.prisma.userCompany
      .delete({
      where: { uuid },
      select: {
        uuid: true,
        createdAt: true,
        updatedAt: true,
        user: { select: { uuid: true } },
        company: { select: { uuid: true } },
      },
      })
      .then((row): UserCompanyView => ({
        uuid: row.uuid,
        userUuid: row.user.uuid,
        companyUuid: row.company.uuid,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
      }));
  }
}

