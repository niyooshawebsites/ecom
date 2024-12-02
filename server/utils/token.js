import jwt from "jsonwebtoken";

const createToken = async (user, time) => {
  try {
    return await jwt.sign(user, process.env.JWT_SECRET, { expiresIn: time });
  } catch (err) {
    console.error(err.message);
  }
};

export { createToken };
