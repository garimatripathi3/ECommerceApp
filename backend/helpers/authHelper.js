import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  try {
    const saltRounds  = 10;
    const hashed = await bcrypt.hash(password, rounds);
    return hashed;
  } catch (error) {
    console.log(error);
  }
};

export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};
