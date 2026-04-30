import { InvariantViolationError } from '@/domain/shared/errors/InvariantViolationError';

export function invariant(condition: unknown, message: string): asserts condition {
  if (!condition) throw new InvariantViolationError(message);
}

