//external imports
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");
//

//Register User
exports.registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  let user;
  try {
    user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: "",
        url: "",
      },
    });
  } catch (e) {
    console.log("Problem in register User", e.message);
    // return res.status(500).json({ message: e.message, success: false, e });
    if (e.message.includes("E11000")) {
      return res.status(500).json({
        message: "This Email Already Used try with another email",
        success: false,
      });
    }
    return res.status(500).json({ message: e.message, success: false, e });
  }
  if (!user) {
    return res
      .status(400)
      .json({ message: "Registration Failed", success: false });
  }

  sendToken(user, 201, "Registration successfull", res);
};

//login User
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  let user;
  if (!email || !password) {
    return res.status(500).json({ message: "Please enter Email and Password" });
  }
  try {
    user = await User.findOne({ email }).select("+password");
  } catch (e) {
    console.log("Problem in login");
    return res.status(500).json({ e: e.message, success: false });
  }
  if (!user) {
    return res.status(401).json({ message: "User not found", success: false });
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return res
      .status(401)
      .json({ message: "Invalid email or password", success: false });
  }

  sendToken(user, 200, "Login Successfull", res);
};

//logout
exports.logoutUser = async (req, res, next) => {
  let user;

  try {
    user = await res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
  } catch (e) {
    console.log("Problem in logged out");
    return res.status(500).json({ message: e.message, success: false });
  }
  if (!user) {
    return res
      .status(500)
      .json({ message: "Unable to logged out", success: false });
  }
  return res
    .status(200)
    .json({ message: "Logged Out successful", seccess: true });
};

//forgot password

exports.forgotpassword = async (req, res, next) => {
  let user;

  try {
    user = await User.findOne({ email: req.body.email });
  } catch (e) {
    console.log("Problem in forgotpassword for find user for set new password");
    return res.status(404).json({ message: e.message, success: false });
  }
  if (!user) {
    return res.status(404).json({ message: "User not found", success: false });
  }

  // Get reset password token

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your password reset token is:- \n\n${resetPasswordUrl}\n\n
  If you have not request this email then, 
  please please ignore it`;

  try {
    await sendEmail({
      email: user.email,
      subject: `EJMART Password Recovery`,
      message,
    });

    return res
      .status(200)
      .json({ message: `Email sent to ${user.email} successfully` });
  } catch (e) {
    console.log("Problem in reset password send message or send url");
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return res.status(500).json({ message: e.message, success: false });
  }
};

//reset password
exports.resetPassword = async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  let user;

  try {
    user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
  } catch (e) {
    console.log("Prblem in reset password");
    return res.status(400).json({ message: e.message, seccess: false });
  }

  if (!user) {
    return res.status(400).json({
      message: "Reset Password token is invalid or expierd",
      seccess: false,
    });
  }
  if (req.body.password !== req.body.confirmPassword) {
    return res
      .status(400)
      .json({ message: "Password dose not match", seccess: false });
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendToken(user, 200, "Password reset successfully", res);
};

//get all user
exports.getAllUser = async (req, res, next) => {
  let user;
  try {
    user = await User.find({});
  } catch (e) {
    console.log("Problem in get all user");
    return res.status(500).json({ message: e.message, success: false });
  }

  if (!user) {
    return res.status(404).json({ message: "No User found", success: false });
  }
  return res
    .status(200)
    .json({ message: "Here the users", success: true, user });
};

//get singler user details
exports.getAUserDetails = async (req, res, next) => {
  let user;

  try {
    user = await User.findById(req.params.id);
  } catch (e) {
    console.log("Problem in get A User Details");
    return res.status(401).json({ message: e.message, success: false });
  }
  if (!user) {
    return res.status(404).json({ message: "No user found", success: false });
  }
  return res
    .status(200)
    .json({ message: "Here is the user", success: true, user });
};

//get user details
exports.getUserDetails = async (req, res, next) => {
  let user;
  try {
    user = await User.findById(req.user.id);
  } catch (e) {
    console.log("Problem in get User Details");
    return res.status(500).json({ message: e.message, success: false });
  }

  if (!user) {
    return res
      .status(401)
      .json({ message: "Unable to access", success: false });
  }
  return res
    .status(200)
    .json({ message: "Here is the User Details", success: true, user });
};

//update password
exports.updatePassword = async (req, res, next) => {
  let user;
  let isPasswordMatched;
  try {
    user = await User.findById(req.user.id).select("+password");
    isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  } catch (e) {
    console.log("Problem in Update password");
    return res.status(500).json({ message: e.message, success: false });
  }

  if (!isPasswordMatched) {
    return res
      .status(400)
      .json({ message: "Old password is icorrect", seccess: false });
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return res
      .status(400)
      .json({ message: "Password dose not matched", seccess: false });
  }

  user.password = req.body.newPassword;
  await user.save();

  sendToken(user, 200, "Password Updated successfully", res);
};

//update profile
exports.updateProfile = async (req, res, next) => {
  let user;
  let myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  };

  try {
    user = await User.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  } catch (e) {
    console.log("Problem  in update user profile");
    return res.status(500).json({ message: e.message, seccess: false });
  }

  return res.status(200).json({
    message: "User Details Updated successfully",
    seccess: true,
    user,
  });

  //we will add cloudenery later
};

//update user role (admin)
exports.updateUserRole = async (req, res, next) => {
  let user;

  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  try {
    user = await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  } catch (e) {
    console.log("Problem  in update user profile");
    return res.status(500).json({ message: e.message, seccess: false });
  }

  if (!user) {
    return res.status(404).json({ message: "No user found", success: false });
  }
  return res.status(200).json({
    message: "User Details Updated successfully",
    seccess: true,
    user,
  });
};

//delete user (admin)
exports.deleteUser = async (req, res, next) => {
  let user;

  try {
    user = await User.findByIdAndDelete(req.params.id);
  } catch (e) {
    console.log("Problem in delete user");
    return res.status(500).json({ message: e.message, success: false });
  }

  if (!user) {
    return res.status(403).json({
      message: "Forbiden to delete user for not found",
      success: false,
    });
  }
  return res
    .status(200)
    .json({ message: "User Deleted successfully", success: true, user });
};
