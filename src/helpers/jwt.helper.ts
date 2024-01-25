import * as jwt from 'jsonwebtoken';
import argon2 from 'argon2';

export const sign = (data: unknown, secret: string, tcl = 900): string =>
  jwt.sign({ data, iat: Math.floor(Date.now() / 1000) + tcl }, secret);

export const isVerify = async (
  hash: string,
  password: string,
): Promise<boolean> =>
  await argon2.verify(hash, password, {
    secret: Buffer.from(process.env.SECRET),
  });

export const isValidToken = (token: string, secret: string): boolean => {
  try {
    jwt.verify(token, secret);
    return true;
  } catch (error) {
    return false
  }
}
