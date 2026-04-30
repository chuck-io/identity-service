import { Injectable } from '@nestjs/common';

import type { UserCreateInput, UserRepository, UserUpdateInput } from '@/domain/ports/user.repository';
import { PrismaService } from '@/infrastructure/database/prisma/prisma.service';
import { DataEncryptionService } from '@/infrastructure/security/crypto/data-encryption.service';
import { PasswordHasherService } from '@/infrastructure/security/password/password-hasher.service';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly encryption: DataEncryptionService,
    private readonly passwordHasher: PasswordHasherService,
  ) {}

  async create(input: UserCreateInput) {
    const data: Record<string, unknown> = { ...input };

    if (typeof input.personRegistrationNumber === 'string' && input.personRegistrationNumber.length > 0) {
      data.personRegistrationNumber = this.encryption.encrypt(input.personRegistrationNumber);
      data.personRegistrationNumberHash = this.encryption.hashDeterministic(input.personRegistrationNumber);
    }

    data.password = await this.passwordHasher.hash(input.password);

    return this.prisma.user.create({
      data: data as never,
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

  async updateByUuid(uuid: string, input: UserUpdateInput) {
    const data: Record<string, unknown> = { ...input };

    if (typeof input.personRegistrationNumber === 'string' && input.personRegistrationNumber.length > 0) {
      data.personRegistrationNumber = this.encryption.encrypt(input.personRegistrationNumber);
      data.personRegistrationNumberHash = this.encryption.hashDeterministic(input.personRegistrationNumber);
    }

    if (typeof input.password === 'string' && input.password.length > 0) {
      data.password = await this.passwordHasher.hash(input.password);
    }

    return this.prisma.user.update({
      where: { uuid },
      data: data as never,
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

