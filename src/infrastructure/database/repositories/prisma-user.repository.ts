import { Injectable } from '@nestjs/common';

import type { UserCreateInput, UserRepository, UserUpdateInput } from '../../../application/ports/user.repository';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(input: UserCreateInput) {
    return this.prisma.user.create({
      data: input,
      select: {
        uuid: true,
        companyId: true,
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  findAll(pagination?: { skip?: number; take?: number }) {
    return this.prisma.user.findMany({
      skip: pagination?.skip,
      take: pagination?.take,
      orderBy: { id: 'asc' },
      select: {
        uuid: true,
        companyId: true,
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  findByUuid(uuid: string) {
    return this.prisma.user.findUnique({
      where: { uuid },
      select: {
        uuid: true,
        companyId: true,
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  updateByUuid(uuid: string, input: UserUpdateInput) {
    return this.prisma.user.update({
      where: { uuid },
      data: input,
      select: {
        uuid: true,
        companyId: true,
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  deleteByUuid(uuid: string) {
    return this.prisma.user.delete({
      where: { uuid },
      select: {
        uuid: true,
        companyId: true,
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}

