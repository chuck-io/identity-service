import { invariant } from '@/domain/shared/guards/invariant';

export type Uuid = string & { readonly __brand: 'Uuid' };

const UUID_V4_V7_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function Uuid(value: string): Uuid {
  invariant(UUID_V4_V7_REGEX.test(value), 'Invalid UUID format');
  return value as Uuid;
}

