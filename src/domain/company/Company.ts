import { Entity } from '../shared/entity/Entity';
import type { Timestamps } from '../shared/entity/Timestamps';
import type { Uuid } from '../shared/types/Uuid';
import { invariant } from '../shared/guards/invariant';

export type CompanyProps = Readonly<{
  uuid: Uuid;
  companyId: string;
  name: string;
  companyRegistrationNumber: string;
  timestamps: Timestamps;
}>;

export class Company extends Entity<number> {
  private constructor(
    id: number,
    readonly uuid: Uuid,
    readonly companyId: string,
    readonly name: string,
    readonly companyRegistrationNumber: string,
    readonly timestamps: Timestamps,
  ) {
    super(id);
  }

  static rehydrate(id: number, props: CompanyProps): Company {
    invariant(props.companyId.trim().length > 0, 'Company.companyId cannot be empty');
    invariant(props.name.trim().length > 0, 'Company.name cannot be empty');
    invariant(
      props.companyRegistrationNumber.trim().length > 0,
      'Company.companyRegistrationNumber cannot be empty',
    );

    return new Company(
      id,
      props.uuid,
      props.companyId.trim(),
      props.name.trim(),
      props.companyRegistrationNumber.trim(),
      props.timestamps,
    );
  }
}

