import { invariant } from '@/domain/shared/guards/invariant';
import { Entity } from '@/domain/shared/entity/Entity';
import type { Timestamps } from '@/domain/shared/entity/Timestamps';
import type { Email } from '@/domain/shared/types/Email';
import type { Uuid } from '@/domain/shared/types/Uuid';

export type UserProps = Readonly<{
  uuid: Uuid;
  companyId?: string | null;
  firstName: string;
  lastName: string;
  email: Email;
  passwordHash: string;
  timestamps: Timestamps;
}>;

export class User extends Entity<number> {
  private constructor(
    id: number,
    readonly uuid: Uuid,
    readonly companyId: string | null,
    readonly firstName: string,
    readonly lastName: string,
    readonly email: Email,
    readonly passwordHash: string,
    readonly timestamps: Timestamps,
  ) {
    super(id);
  }

  static rehydrate(id: number, props: UserProps): User {
    invariant(props.firstName.trim().length > 0, 'User.firstName cannot be empty');
    invariant(props.lastName.trim().length > 0, 'User.lastName cannot be empty');
    invariant(props.passwordHash.trim().length > 0, 'User.passwordHash cannot be empty');

    return new User(
      id,
      props.uuid,
      props.companyId?.trim() ? props.companyId.trim() : null,
      props.firstName.trim(),
      props.lastName.trim(),
      props.email,
      props.passwordHash,
      props.timestamps,
    );
  }
}

