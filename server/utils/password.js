import bcryptjs from "bcryptjs";

const encryptPassword = async (password) => {
  try {
    const salt = await bcryptjs.genSalt(10);
    return await bcryptjs.hash(password, salt);
  } catch (err) {
    console.error(err.message);
  }
};

const decryptPassword = async (password, encryptedPassword) => {
  try {
    return await bcryptjs.compare(password, encryptedPassword);
  } catch (err) {
    console.error(err.message);
  }
};

export { encryptPassword, decryptPassword };
