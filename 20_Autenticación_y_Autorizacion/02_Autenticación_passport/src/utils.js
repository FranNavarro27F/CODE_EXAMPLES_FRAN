import * as url from "url";
import bcrypt from "bcrypt";

const __filename = url.fileURLToPath(import.meta.url);
export const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

export const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync());
};

export const isValidPassword = (user, newPassword) => {
  return bcrypt.compareSync(newPassword, user.password);
};
