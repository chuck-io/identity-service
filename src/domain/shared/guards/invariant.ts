import { InvariantViolationError } from '../errors/InvariantViolationError';

export function invariant(condition: unknown, message: string): asserts condition {
  if (!condition) throw new InvariantViolationError(message);
}

