import jwt from "jsonwebtoken";
import response from "../utils/response.js";

const auth = async (req, res, next) => {
  try {
    const authToken = req.cookies?.authToken;

    if (!authToken) return response(res, false, "No token! No access");

    const result = await jwt.verify(
      authToken,
      process.env.JWT_SECRET,
      (err, user) => {
        if (err) {
          return response(res, false, "JWT token error!");
        } else {
          req.user = user;
          next();
        }
      }
    );
  } catch (err) {
    console.log(err.message);
  }
};
