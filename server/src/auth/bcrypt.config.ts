/* eslint-disable @typescript-eslint/return-await */
const bcrypt = require('bcrypt');

const saltRounds = 10;

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(saltRounds);
  // eslint-disable-next-line @typescript-eslint/return-await
  return await bcrypt.hash(password, salt);
};

// eslint-disable-next-line arrow-body-style
export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};
