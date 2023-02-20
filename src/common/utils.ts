import * as argon2 from 'argon2';

export const isPasswordMatching = async (
  hashedPassword: string,
  plainTextPassword: string,
): Promise<boolean> => await argon2.verify(hashedPassword, plainTextPassword);

export const buildImageUrl = (key: string): string => {
  return `https://imgs.minibook.io/${key}`;
};
