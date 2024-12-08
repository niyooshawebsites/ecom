import jwt from "jsonwebtoken";
import response from "../utils/response.js";

const verifyEmail = async (req, res, next) => {
  try {
    const { authToken } = req.params;
    if (!authToken)
      return response(res, 401, false, "No token. No persmission");

    const result = await jwt.verify(
      authToken,
      process.env.JWT_SECRET,
      (err, user) => {
        if (err) return response(res, 401, false, "JWT token error!");

        req.user = user;
        next();
      }
    );
  } catch (err) {
    console.error(err.message);
  }
};

export default verifyEmail;
