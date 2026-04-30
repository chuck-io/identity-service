import { invariant } from '@/domain/shared/guards/invariant';
import { Entity } from '@/domain/shared/entity/Entity';
import type { Timestamps } from '@/domain/shared/entity/Timestamps';
import type { Uuid } from '@/domain/shared/types/Uuid';

export type TeacherProps = Readonly<{
  uuid: Uuid;
  userId: number;
  subject: string;
  timestamps: Timestamps;
}>;

export class Teacher extends Entity<number> {
  private constructor(
    id: number,
    readonly uuid: Uuid,
    readonly userId: number,
    readonly subject: string,
    readonly timestamps: Timestamps,
  ) {
    super(id);
  }

  static rehydrate(id: number, props: TeacherProps): Teacher {
    invariant(Number.isInteger(props.userId) && props.userId > 0, 'Teacher.userId must be a positive integer');
    invariant(props.subject.trim().length > 0, 'Teacher.subject cannot be empty');

    return new Teacher(id, props.uuid, props.userId, props.subject.trim(), props.timestamps);
  }
}

