//external imports
const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotpassword,
  resetPassword,
  getAllUser,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAUserDetails,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
//

const userRoute = express.Router();

userRoute.route("/register").post(registerUser);
userRoute.route("/login").post(loginUser);
userRoute.route("/logout").get(logoutUser);
userRoute.route("/password/forgot").post(forgotpassword);
userRoute.route("/password/reset/:token").put(resetPassword);

userRoute
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser);

userRoute
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAUserDetails)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

userRoute.route("/me").get(isAuthenticatedUser, getUserDetails);
userRoute.route("/password/update").put(isAuthenticatedUser, updatePassword);
userRoute.route("/me/update").put(isAuthenticatedUser, updateProfile);

module.exports = userRoute;
