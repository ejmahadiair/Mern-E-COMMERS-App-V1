//external imports
const req = require("express/lib/request");
const res = require("express/lib/response");
const jwt = require("jsonwebtoken");
//
//internal imports
const User = require("../models/userModel");
//
exports.isAuthenticatedUser = async (req, res, next) => {
  const { token } = await req.cookies;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Please Login for access", success: false });
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedData.id);
  next();
};

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `This Role ${req.user.role} is not allowed to access`,
      });
    }
    next();
  };
};
