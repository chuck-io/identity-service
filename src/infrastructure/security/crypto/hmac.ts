import crypto from 'node:crypto';

export function hmacSha256Base64Url(input: string, key: Buffer): string {
  const digest = crypto.createHmac('sha256', key).update(input, 'utf8').digest('base64');
  // base64url (no padding)
  return digest.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

