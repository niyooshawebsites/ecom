import jwt from "jsonwebtoken";
import response from "../utils/response.js";

const auth = async (req, res, next) => {
  try {
    const authToken = req.cookies?.authToken;
    console.log(req.cookies);
    console.log("AT", authToken);

    if (!authToken) return response(res, 401, false, "No token! No permission");

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

export default auth;
