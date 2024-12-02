import User from "../models/user.model.js";
import response from "../utils/response.js";
import { encryptPassword, decryptPassword } from "../utils/password.js";
import { verificationEmail } from "../utils/mail.js";
import { createToken } from "../utils/token.js";
import { accountVerificationTxt } from "../emailTemplates/accountVerification.js";

const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return response(res, false, "Please fill out all the details");

    // check for existing user
    const user = await User.findOne({ $or: [{ username }, { email }] });

    if (user) return response(res, false, "Account already exists!");

    const authToken = await createToken({ userId: "New user id" }, "1d");

    const mailOptions = {
      from: "info@woodcart.com",
      to: email,
      subject: "Email verification",
      html: accountVerificationTxt(authToken),
    };

    // sending verification email
    await verificationEmail(mailOptions);

    const newUser = await new User({
      username,
      email,
      password: await encryptPassword(password),
    }).save();

    return response(res, true, "Registration successful");
  } catch (err) {
    console.error(err.message);
    return response(res, false, "Internal server error!");
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    if (!email || !password)
      return response(res, false, "Please fill out all the details!");

    const user = await User.findOne({ email });
    if (!user) return response(res, false, "Invalid email or password");

    const validPassword = await decryptPassword(password, user.password);

    if (!validPassword)
      return response(res, false, "Invalid email or password");

    const authToken = await createToken({ userId: user._id }, "1d");

    // setting the cookie
    res.cookie("authToken", authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV == "production" ? true : false,
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
    });

    return response(res, true, "Login successful");
  } catch (err) {
    console.error(err.message);
    return response(res, false, "Internal server error!");
  }
};

export { registerController, loginController };
