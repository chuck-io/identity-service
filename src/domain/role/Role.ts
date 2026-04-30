import { invariant } from '@/domain/shared/guards/invariant';
import { Entity } from '@/domain/shared/entity/Entity';
import type { Timestamps } from '@/domain/shared/entity/Timestamps';
import type { Uuid } from '@/domain/shared/types/Uuid';

export type RoleProps = Readonly<{
  uuid: Uuid;
  name: string;
  description?: string | null;
  timestamps: Timestamps;
}>;

export class Role extends Entity<number> {
  private constructor(
    id: number,
    readonly uuid: Uuid,
    readonly name: string,
    readonly description: string | null,
    readonly timestamps: Timestamps,
  ) {
    super(id);
  }

  static rehydrate(id: number, props: RoleProps): Role {
    invariant(props.name.trim().length > 0, 'Role.name cannot be empty');

    return new Role(
      id,
      props.uuid,
      props.name.trim(),
      props.description ?? null,
      props.timestamps,
    );
  }
}

