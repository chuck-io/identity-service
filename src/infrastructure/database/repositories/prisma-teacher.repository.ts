import { Injectable } from '@nestjs/common';

import type {
  TeacherCreateInput,
  TeacherRepository,
  TeacherUpdateInput,
  TeacherView,
} from '@/domain/ports/teacher.repository';
import { PrismaService } from '@/infrastructure/database/prisma/prisma.service';

@Injectable()
export class PrismaTeacherRepository implements TeacherRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(input: TeacherCreateInput) {
    return this.prisma.teacher
      .create({
      data: {
        subject: input.subject,
        user: { connect: { uuid: input.userUuid } },
      },
      select: {
        uuid: true,
        subject: true,
        createdAt: true,
        updatedAt: true,
        user: { select: { uuid: true } },
      },
      })
      .then((t): TeacherView => ({
        uuid: t.uuid,
        userUuid: t.user.uuid,
        subject: t.subject,
        createdAt: t.createdAt,
        updatedAt: t.updatedAt,
      }));
  }

  findAll(pagination?: { skip?: number; take?: number }) {
    return this.prisma.teacher
      .findMany({
      skip: pagination?.skip,
      take: pagination?.take,
      orderBy: { id: 'asc' },
      select: {
        uuid: true,
        subject: true,
        createdAt: true,
        updatedAt: true,
        user: { select: { uuid: true } },
      },
      })
      .then(
        (rows): TeacherView[] =>
          rows.map((t) => ({
            uuid: t.uuid,
            userUuid: t.user.uuid,
            subject: t.subject,
            createdAt: t.createdAt,
            updatedAt: t.updatedAt,
          })),
      );
  }

  findByUuid(uuid: string) {
    return this.prisma.teacher
      .findUnique({
      where: { uuid },
      select: {
        uuid: true,
        subject: true,
        createdAt: true,
        updatedAt: true,
        user: { select: { uuid: true } },
      },
      })
      .then((t): TeacherView | null =>
        t
          ? {
              uuid: t.uuid,
              userUuid: t.user.uuid,
              subject: t.subject,
              createdAt: t.createdAt,
              updatedAt: t.updatedAt,
            }
          : null,
      );
  }

  updateByUuid(uuid: string, input: TeacherUpdateInput) {
    return this.prisma.teacher
      .update({
      where: { uuid },
      data: {
        subject: input.subject,
        ...(input.userUuid ? { user: { connect: { uuid: input.userUuid } } } : {}),
      },
      select: {
        uuid: true,
        subject: true,
        createdAt: true,
        updatedAt: true,
        user: { select: { uuid: true } },
      },
      })
      .then((t): TeacherView => ({
        uuid: t.uuid,
        userUuid: t.user.uuid,
        subject: t.subject,
        createdAt: t.createdAt,
        updatedAt: t.updatedAt,
      }));
  }

  deleteByUuid(uuid: string) {
    return this.prisma.teacher
      .delete({
      where: { uuid },
      select: {
        uuid: true,
        subject: true,
        createdAt: true,
        updatedAt: true,
        user: { select: { uuid: true } },
      },
      })
      .then((t): TeacherView => ({
        uuid: t.uuid,
        userUuid: t.user.uuid,
        subject: t.subject,
        createdAt: t.createdAt,
        updatedAt: t.updatedAt,
      }));
  }
}

