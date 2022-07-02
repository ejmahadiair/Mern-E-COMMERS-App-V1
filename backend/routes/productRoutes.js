//external inports
const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetail,
  createAndUpdateProductReview,
  getAProductAllReviews,
  deleteReview,
} = require("../controllers/productControllers");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

//

const productRoute = express.Router();

productRoute.route("/products").get(getAllProducts);

productRoute
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);
//update product --Admin then Delet product --admin then get product detail
productRoute
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);
productRoute.route("/product/:id").get(getProductDetail);

productRoute
  .route("/review")
  .put(isAuthenticatedUser, createAndUpdateProductReview);
productRoute
  .route("/reviews")
  .get(getAProductAllReviews)
  .delete(isAuthenticatedUser, deleteReview);

module.exports = productRoute;
