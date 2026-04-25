export class DomainError extends Error {
  readonly name: string = 'DomainError';

  constructor(message: string) {
    super(message);
  }
}

