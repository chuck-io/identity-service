import { invariant } from '../guards/invariant';

export type Email = string & { readonly __brand: 'Email' };

// pragmatic validation: enough for domain-level guard, not RFC-complete
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Email(value: string): Email {
  const normalized = value.trim().toLowerCase();
  invariant(EMAIL_REGEX.test(normalized), 'Invalid email');
  return normalized as Email;
}

