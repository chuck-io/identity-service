import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { decryptString, encryptString, parseKeyFromBase64 } from './aes256gcm';
import { hmacSha256Base64Url } from './hmac';

@Injectable()
export class DataEncryptionService {
  private readonly key: Buffer;
  private readonly hmacKey: Buffer;

  constructor(config: ConfigService) {
    const keyB64 = config.get<string>('DATA_ENCRYPTION_KEY');
    if (!keyB64) throw new Error('Missing DATA_ENCRYPTION_KEY');
    this.key = parseKeyFromBase64(keyB64);

    const hmacKeyB64 = config.get<string>('DATA_ENCRYPTION_HMAC_KEY');
    if (!hmacKeyB64) throw new Error('Missing DATA_ENCRYPTION_HMAC_KEY');
    this.hmacKey = parseKeyFromBase64(hmacKeyB64);
  }

  encrypt(plaintext: string): string {
    return encryptString(plaintext, this.key);
  }

  decrypt(payloadB64: string): string {
    return decryptString(payloadB64, this.key);
  }

  hashDeterministic(value: string): string {
    // minimal normalization: trim only (avoid changing semantics unexpectedly)
    return hmacSha256Base64Url(value.trim(), this.hmacKey);
  }
}

