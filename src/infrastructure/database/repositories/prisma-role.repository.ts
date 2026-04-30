import { Injectable } from '@nestjs/common';

import type { RoleRepository, RoleCreateInput, RoleUpdateInput } from '@/domain/ports/role.repository';
import { PrismaService } from '@/infrastructure/database/prisma/prisma.service';

@Injectable()
export class PrismaRoleRepository implements RoleRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(input: RoleCreateInput) {
    return this.prisma.role.create({
      data: input,
      select: { uuid: true, name: true, description: true, createdAt: true, updatedAt: true },
    });
  }

  findAll(pagination?: { skip?: number; take?: number }) {
    return this.prisma.role.findMany({
      skip: pagination?.skip,
      take: pagination?.take,
      orderBy: { id: 'asc' },
      select: { uuid: true, name: true, description: true, createdAt: true, updatedAt: true },
    });
  }

  findByUuid(uuid: string) {
    return this.prisma.role.findUnique({
      where: { uuid },
      select: { uuid: true, name: true, description: true, createdAt: true, updatedAt: true },
    });
  }

  findByName(name: string) {
    return this.prisma.role.findUnique({
      where: { name },
      select: { uuid: true, name: true, description: true, createdAt: true, updatedAt: true },
    });
  }

  updateByUuid(uuid: string, input: RoleUpdateInput) {
    return this.prisma.role.update({
      where: { uuid },
      data: input,
      select: { uuid: true, name: true, description: true, createdAt: true, updatedAt: true },
    });
  }

  deleteByUuid(uuid: string) {
    return this.prisma.role.delete({
      where: { uuid },
      select: { uuid: true, name: true, description: true, createdAt: true, updatedAt: true },
    });
  }
}

