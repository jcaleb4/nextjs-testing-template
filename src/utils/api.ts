import { hash, compare } from 'bcryptjs';

export const getUrlParams = (reqUrl: string) => {
  const url = new URL(reqUrl);
  const searchParams = new URLSearchParams(url.searchParams);

  return {
    ...url,
    searchParams,
  };
};

export const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword = await hash(password, 10);

  return hashedPassword;
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  const isValid = await compare(password, hashedPassword);

  return isValid;
};
