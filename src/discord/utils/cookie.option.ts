import { CookieOptions } from 'express';

export const defaultCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: false,
  sameSite: 'lax',
  path: '/',
  domain: 'localhost',
};

export const refreshTokenCookieOptions: CookieOptions = {
  ...defaultCookieOptions,
  maxAge: 3600000 * 24 * 7,
};

export const accessTokenCookieOptions: CookieOptions = {
  ...defaultCookieOptions,
  maxAge: 3600000,
};
