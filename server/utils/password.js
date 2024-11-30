import bcryptjs from "bcryptjs";

const encryptPassword = async (password) => {
  const salt = bcryptjs.genSalt(10);
  return bcryptjs.hash(password, salt);
};

export { encryptPassword };
