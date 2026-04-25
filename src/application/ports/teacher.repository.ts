export const TEACHER_REPOSITORY = Symbol('TEACHER_REPOSITORY');

export type TeacherView = Readonly<{
  uuid: string;
  userUuid: string;
  subject: string;
  createdAt: Date;
  updatedAt: Date;
}>;

export type TeacherCreateInput = Readonly<{
  userUuid: string;
  subject: string;
}>;

export type TeacherUpdateInput = Readonly<{
  userUuid?: string;
  subject?: string;
}>;

export interface TeacherRepository {
  create(input: TeacherCreateInput): Promise<TeacherView>;
  findAll(pagination?: { skip?: number; take?: number }): Promise<TeacherView[]>;
  findByUuid(uuid: string): Promise<TeacherView | null>;
  updateByUuid(uuid: string, input: TeacherUpdateInput): Promise<TeacherView>;
  deleteByUuid(uuid: string): Promise<TeacherView>;
}

