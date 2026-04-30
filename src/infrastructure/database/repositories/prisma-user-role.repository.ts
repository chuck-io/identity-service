import { Injectable } from '@nestjs/common';

import type {
  UserRoleCreateInput,
  UserRoleRepository,
  UserRoleUpdateInput,
  UserRoleView,
} from '@/domain/ports/user-role.repository';
import { PrismaService } from '@/infrastructure/database/prisma/prisma.service';

@Injectable()
export class PrismaUserRoleRepository implements UserRoleRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(input: UserRoleCreateInput) {
    return this.prisma.userRole
      .create({
      data: {
        user: { connect: { uuid: input.userUuid } },
        role: { connect: { uuid: input.roleUuid } },
      },
      select: {
        uuid: true,
        createdAt: true,
        updatedAt: true,
        user: { select: { uuid: true } },
        role: { select: { uuid: true } },
      },
      })
      .then((row): UserRoleView => ({
        uuid: row.uuid,
        userUuid: row.user.uuid,
        roleUuid: row.role.uuid,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
      }));
  }

  findAll(pagination?: { skip?: number; take?: number }) {
    return this.prisma.userRole
      .findMany({
      skip: pagination?.skip,
      take: pagination?.take,
      orderBy: { id: 'asc' },
      select: {
        uuid: true,
        createdAt: true,
        updatedAt: true,
        user: { select: { uuid: true } },
        role: { select: { uuid: true } },
      },
      })
      .then(
        (rows): UserRoleView[] =>
          rows.map((row) => ({
            uuid: row.uuid,
            userUuid: row.user.uuid,
            roleUuid: row.role.uuid,
            createdAt: row.createdAt,
            updatedAt: row.updatedAt,
          })),
      );
  }

  findByUuid(uuid: string) {
    return this.prisma.userRole
      .findUnique({
      where: { uuid },
      select: {
        uuid: true,
        createdAt: true,
        updatedAt: true,
        user: { select: { uuid: true } },
        role: { select: { uuid: true } },
      },
      })
      .then((row): UserRoleView | null =>
        row
          ? {
              uuid: row.uuid,
              userUuid: row.user.uuid,
              roleUuid: row.role.uuid,
              createdAt: row.createdAt,
              updatedAt: row.updatedAt,
            }
          : null,
      );
  }

  updateByUuid(uuid: string, input: UserRoleUpdateInput) {
    return this.prisma.userRole
      .update({
      where: { uuid },
      data: {
        ...(input.userUuid ? { user: { connect: { uuid: input.userUuid } } } : {}),
        ...(input.roleUuid ? { role: { connect: { uuid: input.roleUuid } } } : {}),
      },
      select: {
        uuid: true,
        createdAt: true,
        updatedAt: true,
        user: { select: { uuid: true } },
        role: { select: { uuid: true } },
      },
      })
      .then((row): UserRoleView => ({
        uuid: row.uuid,
        userUuid: row.user.uuid,
        roleUuid: row.role.uuid,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
      }));
  }

  deleteByUuid(uuid: string) {
    return this.prisma.userRole
      .delete({
      where: { uuid },
      select: {
        uuid: true,
        createdAt: true,
        updatedAt: true,
        user: { select: { uuid: true } },
        role: { select: { uuid: true } },
      },
      })
      .then((row): UserRoleView => ({
        uuid: row.uuid,
        userUuid: row.user.uuid,
        roleUuid: row.role.uuid,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
      }));
  }
}

