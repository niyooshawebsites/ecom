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

    if (user)
      return response(res, 409, false, "Account already exists! Please login");

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

    return response(res, 201, true, "Registration successful", newUser);
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

    let user = await User.findOne({ email });
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

    user = {
      _id: user._id,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      isVerified: user.isVerified,
      username: user.username,
    };

    return response(res, 200, true, "Login successful", user);
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

const fetchUserAtOrderCreationController = async (req, res) => {
  try {
    const { username, email } = req.params;

    if (!username) return response(res, 400, false, "Username id missing");
    if (!email) return response(res, 400, false, "Email id missing");

    const user = await User.findOne({ $or: [{ username }, { email }] }).select(
      "-password"
    );

    if (!user) return response(res, 404, false, "No user found");

    return response(
      res,
      200,
      true,
      "User already exists. Please login to place the order",
      user
    );
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

    const encryptedPassword = await encryptPassword(password);

    const updatedUser = await User.findByIdAndUpdate(
      uid,
      { $set: { password: encryptedPassword } },
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
    if (!newPassword)
      return response(res, 400, false, "Reset password missing");

    const userId = req.user.userId;

    const user = await User.findById(userId);

    if (!user) return response(res, 404, false, "No user found");

    const encryptedPassword = await encryptPassword(newPassword);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { password: encryptedPassword } },
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

    const {
      fName,
      lName,
      contactNo,
      buildingNo,
      streetNo,
      locality,
      district,
      landmark,
      city,
      state,
      pincode,
    } = req.body;

    if (!fName) return response(res, 400, false, "First name missing");

    if (!lName) return response(res, 400, false, "Last name missing");

    if (!contactNo) return response(res, 400, false, "Conatct number missing");

    if (!buildingNo)
      return response(res, 400, false, "Building number missing");

    if (!streetNo) return response(res, 400, false, "Street number missing");

    if (!locality) return response(res, 400, false, "Locality missing");

    if (!district) return response(res, 400, false, "District missing");

    if (!city) return response(res, 400, false, "City missing");

    if (!state) return response(res, 400, false, "State missing");

    if (!pincode) return response(res, 400, false, "Pincode missing");

    const updatedUser = await User.findByIdAndUpdate(
      uid,
      {
        // Update contact details and address as separate sub-documents
        $set: {
          "contactDetails.fName": fName,
          "contactDetails.lName": lName,
          "contactDetails.contactNo": contactNo,
          "contactDetails.address.buildingNo": buildingNo,
          "contactDetails.address.streetNo": streetNo,
          "contactDetails.address.locality": locality,
          "contactDetails.address.district": district,
          "contactDetails.address.landmark": landmark,
          "contactDetails.address.city": city,
          "contactDetails.address.state": state,
          "contactDetails.address.pincode": pincode,
        },
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

const updateContactDetailsWhilePlcingOrderController = async (req, res) => {
  try {
    const { uid } = req.params;

    const {
      fName,
      lName,
      contactNo,
      buildingNo,
      streetNo,
      locality,
      district,
      landmark,
      city,
      state,
      pincode,
    } = req.body;

    if (!fName) return response(res, 400, false, "First name missing");

    if (!lName) return response(res, 400, false, "Last name missing");

    if (!contactNo) return response(res, 400, false, "Conatct number missing");

    if (!buildingNo)
      return response(res, 400, false, "Building number missing");

    if (!streetNo) return response(res, 400, false, "Street number missing");

    if (!locality) return response(res, 400, false, "Locality missing");

    if (!district) return response(res, 400, false, "District missing");

    if (!city) return response(res, 400, false, "City missing");

    if (!state) return response(res, 400, false, "State missing");

    if (!pincode) return response(res, 400, false, "Pincode missing");

    const updatedUser = await User.findByIdAndUpdate(
      uid,
      {
        // Update contact details and address as separate sub-documents
        $set: {
          "contactDetails.fName": fName,
          "contactDetails.lName": lName,
          "contactDetails.contactNo": contactNo,
          "contactDetails.address.buildingNo": buildingNo,
          "contactDetails.address.streetNo": streetNo,
          "contactDetails.address.locality": locality,
          "contactDetails.address.district": district,
          "contactDetails.address.landmark": landmark,
          "contactDetails.address.city": city,
          "contactDetails.address.state": state,
          "contactDetails.address.pincode": pincode,
        },
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

const updateActivationStatusController = async (req, res) => {
  try {
    const { uid } = req.params;
    const { activationStatus } = req.body;

    if (!uid) return response(res, 400, false, "No uid. No activation toggle");
    if (!activationStatus)
      return response(res, 400, false, "Activation status missing");

    const user = await User.findByIdAndUpdate(
      uid,
      { $set: { isActive: activationStatus === "Activate" ? true : false } },
      { new: true }
    );

    return response(res, 201, true, "Activation status changed successfully");
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

const fetchUserByEmailController = async (req, res) => {
  try {
    const { userEmail } = req.params;
    if (!userEmail) return response(res, 400, false, "User email missing");

    const user = await User.findOne({ email: userEmail }).select("-password");
    if (!user) return response(res, 404, false, "No user found");

    return response(res, 200, true, "User fetched", user);
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

const fetchUserByActiveStatusController = async (req, res) => {
  try {
    const { activeStatus } = req.params;
    if (!activeStatus) return response(res, 400, false, "User status missing");

    const booleanStatus = activeStatus == "Active" ? true : false;

    const users = await User.find({ isActive: booleanStatus }).select(
      "-password"
    );

    if (users.length === 0) return response(res, 404, false, "No users found");

    return response(res, 200, true, `${activeStatus} users fetched`, users);
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

const fetchUserByVerificationStatusController = async (req, res) => {
  try {
    const { verificationStatus } = req.params;

    if (!verificationStatus)
      return response(res, 400, false, "User verification status missing");

    const booleanStatus = verificationStatus == "Verified" ? true : false;

    const users = await User.find({ isVerified: booleanStatus }).select(
      "-password"
    );

    if (users.length === 0) return response(res, 404, false, "No users found");

    return response(
      res,
      200,
      true,
      `${verificationStatus} users fetched`,
      users
    );
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

const fetchUserByDatesController = async (req, res) => {
  try {
    const { startDate, endDate } = req.params;

    if (!startDate || !endDate)
      return response(res, 400, false, "Please select the dates");

    const users = await User.find({
      createdAt: { $gte: startDate, $lte: endDate },
    }).select("-password");

    if (users.length === 0) return response(res, 404, false, "No users found");

    return response(res, 200, true, "Users found", users);
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

const deleteUsersController = async (req, res) => {
  try {
    const { uids } = req.params;

    if (!uids || !Array.isArray(uids) || uids.length === 0)
      return response(res, 400, false, "No uids. No multiple deletion");

    const result = await User.deleteMany({ _id: { $in: uids } });

    return response(res, 200, true, "Users deleted successfully");
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
  fetchUserAtOrderCreationController,
  updateUserPasswordController,
  deleteUserController,
  verifyUserController,
  forgotPasswordController,
  resetPasswordController,
  updateContactDetailsController,
  updateContactDetailsWhilePlcingOrderController,
  updateActivationStatusController,
  fetchUserByEmailController,
  fetchUserByActiveStatusController,
  fetchUserByVerificationStatusController,
  fetchUserByDatesController,
  deleteUsersController,
};
