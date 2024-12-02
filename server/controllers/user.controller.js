import User from "../models/user.model.js";
import response from "../utils/response.js";
import { encryptPassword } from "../utils/password.js";
import { verificationEmail } from "../utils/mail.js";

const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return response(res, false, "Please fill out all the details");

    // check for existing user
    const user = await User.findOne({ $or: [{ username }, { email }] });

    if (user) return response(res, false, "Account already exists!");

    const mailOptions = {
      from: "info@woodcart.com",
      to: email,
      subject: "Email verification",
      text: "Please verify your email",
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

    if (!email || !password)
      return response(res, false, "Please fill out all the details");
  } catch (err) {
    console.error(err.message);
    return response(res, false, "Internal server error!");
  }
};

export { registerController };
