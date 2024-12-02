import bcryptjs from "bcryptjs";

const encryptPassword = async (password) => {
  const salt = await bcryptjs.genSalt(10);
  return await bcryptjs.hash(password, salt);
};

export { encryptPassword };
