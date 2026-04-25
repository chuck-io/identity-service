import { DomainError } from './DomainError';

export class InvariantViolationError extends DomainError {
  override readonly name = 'InvariantViolationError';
}

