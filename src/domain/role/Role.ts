import { Entity } from '../shared/entity/Entity';
import type { Timestamps } from '../shared/entity/Timestamps';
import type { Uuid } from '../shared/types/Uuid';
import { invariant } from '../shared/guards/invariant';

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

