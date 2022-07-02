//external imports
const express = require("express");
const {
  newOrder,
  getAOrder,
  getMyOrders,
  getAllOrdersByAdmin,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderControllers");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
//

const orderRoute = express.Router();

orderRoute.route("/order/new").post(isAuthenticatedUser, newOrder);
orderRoute.route("/order/:id").get(isAuthenticatedUser, getAOrder);
orderRoute.route("/orders/me").get(isAuthenticatedUser, getMyOrders);
orderRoute
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrdersByAdmin);

orderRoute
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

module.exports = orderRoute;
