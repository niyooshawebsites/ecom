import User from "../models/user.model.js";
import response from "../utils/response.js";
import { encryptPassword, decryptPassword } from "../utils/password.js";
import { verificationEmail } from "../utils/mail.js";
import { createToken } from "../utils/token.js";
import {
  accountVerificationTxt,
  passwordResetTxt,
} from "../emailTemplates/accountVerification.js";

const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return response(res, 400, false, "Please fill out all the details");

    // check for existing user
    const user = await User.findOne({ $or: [{ username }, { email }] });

    if (user) return response(res, 409, false, "Account already exists!");

    const newUser = await new User({
      username,
      email,
      password: await encryptPassword(password),
    }).save();

    const authToken = await createToken({ userId: newUser._id }, "1d");

    const mailOptions = {
      from: "info@woodcart.com",
      to: email,
      subject: "Email verification",
      html: accountVerificationTxt(authToken),
    };

    // sending verification email
    await verificationEmail(mailOptions);

    return response(res, 201, true, "Registration successful");
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error!");
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return response(res, 400, false, "Please fill out all the details!");

    const user = await User.findOne({ email });
    if (!user) return response(res, 404, false, "Invalid email or password");

    const validPassword = await decryptPassword(password, user.password);

    if (!validPassword)
      return response(res, 403, false, "Invalid email or password");

    const authToken = await createToken({ userId: user._id }, "1d");

    // setting the cookie
    res.cookie("authToken", authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV == "production" ? true : false,
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
    });

    return response(res, 200, true, "Login successful");
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error!");
  }
};

const logoutController = async (req, res) => {
  try {
    const result = res.clearCookie("authToken");
    if (!result) return response(res, 501, false, "logout failed");

    return response(res, 200, true, "logout successfully");
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error!");
  }
};

const fetchAllUsersController = async (req, res) => {
  try {
    const { pageNo } = req.params;
    const currentPageNo = parseInt(pageNo) || 1;
    const limit = 10;
    const skip = (currentPageNo - 1) * limit;

    const usersPerPage = await User.find().skip(skip).limit(limit);

    if (usersPerPage.length == 0)
      return response(res, 404, false, "No users found");

    const totalUsersCount = User.countDocuments();
    const totalPagesCount = Math.ceil(totalUsersCount / limit);

    return response(
      res,
      200,
      true,
      "All users found",
      usersPerPage,
      totalPagesCount
    );
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error!");
  }
};

const fetchUserController = async (req, res) => {
  try {
    const { uid } = req.params;
    if (!uid) return response(res, 400, false, "User id missing");

    const user = await User.findById(uid).select("-password");
    if (!user) return response(res, 404, false, "No user found");

    return response(res, 200, true, "User found", user);
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

const updateUserPasswordController = async (req, res) => {
  try {
    const { uid } = req.params;
    const { password } = req.body;

    if (!uid) return response(res, 400, false, "uid is missing");
    if (!password) return response(res, 400, false, "Password is missing");

    const updatedUser = await User.findOneAndUpdate(
      uid,
      { password },
      { new: true, runValidators: true }
    );

    return response(res, 201, true, "Password updated successfully");
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

const deleteUserController = async (req, res) => {
  try {
    const { uid } = req.params;
    if (!uid) return response(res, 400, false, "No uid is missing");

    const result = await User.findByIdAndDelete(uid);

    return response(res, 200, true, "User deleted successfully");
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

const verifyUserController = async (req, res) => {
  try {
    const { userId } = req.user._id;

    if (!userId)
      return response(res, 401, false, "No user id found in the token");

    const user = await User.findById(userId);
    if (!user) return response(res, 404, false, "No user found");

    if (userId === user._id) {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { isActive: true, isVerified: true },
        { new: true, runValidators: true }
      );
      return response(res, 200, true, "User verified successfully");
    }
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) return response(res, 400, false, "Email missing");

    const user = await User.findOne({ email });
    if (!user) return response(res, 404, false, "No user found");

    const authToken = await createToken({ userId: user._id }, "1d");

    const mailOptions = {
      from: "info@woodcart.com",
      to: email,
      subject: "Reset Password",
      html: passwordResetTxt(authToken),
    };

    // sending verification email
    await verificationEmail(mailOptions);

    return response(res, 200, true, "Password reset email sent");
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

const resetPasswordController = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const userId = req.user._id;

    if (!newPassword) return response(res, 400, false, "New password missing");

    const user = await User.findById(userId);
    if (!user) return response(res, 404, false, "No user found");

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { password: await encryptPassword(newPassword) },
      { new: true, runValidators: true }
    );

    return response(res, 201, true, "Password reset successful");
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

const updateContactDetailsController = async (req, res) => {
  try {
    const { uid } = req.params;
    const { contactNo, houseNo, streetNo, locality, district, state, pincode } =
      req.body;

    if (
      !contactNo ||
      !houseNo ||
      !streetNo ||
      !locality ||
      !district ||
      !state ||
      !pincode
    )
      return response(res, 400, false, "Please fill out all the details");

    const updatedUser = await User.findByIdAndUpdate(
      uid,
      {
        contactDetails: req.body,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    return response(res, 201, true, "Contact details updated successfully");
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

export {
  registerController,
  loginController,
  logoutController,
  fetchAllUsersController,
  fetchUserController,
  updateUserPasswordController,
  deleteUserController,
  verifyUserController,
  forgotPasswordController,
  resetPasswordController,
  updateContactDetailsController,
};
