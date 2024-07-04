import { createHash } from 'crypto';

const encode = (input: Buffer) => Buffer.from(input).toString('base64url');

export const generateCodeChallenge = (codeVerifier: string) =>
  encode(createHash('sha256').update(codeVerifier).digest());
