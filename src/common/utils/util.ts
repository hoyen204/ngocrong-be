import * as crypto from 'crypto';
import { Momo } from 'src/entities';

const signData = (partnerKey: string, code: string, serial: string) => {
  const mergeString = `${partnerKey}${code}${serial}`;
  return md5(mergeString);
};

const md5 = (plainText: string) => {
  return crypto.createHash('md5').update(plainText).digest('hex');
};

const sha256 = (plainText: string) => {
  return crypto.createHash('sha256').update(plainText).digest('base64');
};

// Encrypt a body using AES
const encryptAES = (body: string, key: string): string => {
  const iv = Buffer.alloc(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', key.substring(0, 32), iv);
  const part1 = cipher.update(body, 'utf8', 'base64'); // Specify output encoding
  const part2 = cipher.final('base64'); // Specify output encoding
  return Buffer.concat([
    Buffer.from(part1, 'base64'),
    Buffer.from(part2, 'base64'),
  ]).toString('base64');
};

// Decrypt a body using AES
const decryptAES = (body: string, key: string): string => {
  const iv = Buffer.alloc(16);
  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    key.substring(0, 32),
    iv,
  );
  const part1 = decipher.update(body, 'base64', 'utf8'); // Specify input and output encoding
  const part2 = decipher.final('utf8'); // Specify output encoding
  return part1 + part2;
};

const encryptRSA = (body: string, key: string): string => {
  return crypto
    .publicEncrypt(
      { key: key, padding: crypto.constants.RSA_PKCS1_PADDING },
      Buffer.from(body),
    )
    .toString('base64');
};

const generateCheckSum = (momo: Momo, type: string, times) => {
  let checkSumSyntax = `${momo.phone}${times}000000${type}${
    times / 1000000000000.0
  }E12`;
  return encryptAES(checkSumSyntax, momo.setupKey);
};

export {
  signData,
  md5,
  sha256,
  encryptAES,
  decryptAES,
  encryptRSA,
  generateCheckSum,
};
