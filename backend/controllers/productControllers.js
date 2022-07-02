//external imports
//
//internal imports
const Product = require("../models/productModel");
const Apifetures = require("../utils/apifetures");
//

//Create Product --Admin

exports.createProduct = async (req, res, next) => {
  req.body.user = req.user.id;
  let product;
  try {
    product = await Product.create(req.body);
  } catch (e) {
    console.log("Problem in create product ");
    // const err = e.message;
    return res.status(500).json({
      message: "Unable to create product",
      success: false,
      e: e.message,
    });
  }
  if (!product) {
    return res
      .status(500)
      .json({ message: "Unable to create product", success: false });
  }
  return res
    .status(200)
    .json({ message: "Product created successfully", success: true, product });
};

//Get All products
exports.getAllProducts = async (req, res, next) => {
  let products;
  let apifetures;
  let resultPerPage = 4;
  const productCount = await Product.countDocuments();
  let filterProductCount;
  try {
    apifetures = new Apifetures(Product.find(), req.query).search().filter();

    products = await apifetures.query;
    filterProductCount = products.length;
    apifetures.pagination(resultPerPage);
    products = await apifetures.query.clone();
  } catch (e) {
    console.log("Problem in Get Products ");
    return res
      .status(404)
      .json({ message: "There has no Products", success: false, e });
  }

  if (!products) {
    return res
      .status(404)
      .json({ message: "There has no Products", success: false });
  }
  res.status(200).json({
    message: "Poducts are available",
    success: true,
    products,
    productCount,
    resultPerPage,
    filterProductCount,
  });
};
//update product --admin
exports.updateProduct = async (req, res, next) => {
  let product;
  const id = req.params.id;

  try {
    product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  } catch (e) {
    e.reason =
      "Invalid Product Id Did not found any product by this id for update";
    console.log("Problem in Update product ");
    return res.status(500).json({
      message: "Product not found or Unable to update product",
      success: false,
      e,
    });
  }
  if (!product) {
    return res.status(500).json({
      message: "Product not found or Unable to update product",
      success: false,
    });
  }
  return res
    .status(200)
    .json({ message: "Product Updated Successfully", success: true, product });
};
//delete product --admin
exports.deleteProduct = async (req, res, next) => {
  let product;
  const id = req.params.id;

  try {
    product = await Product.findByIdAndDelete(id);
  } catch (e) {
    console.log("Problem in delete product ");
    e.reason =
      "Invalid Product Id Did not found any product by this id for Delete";
    return res.status(500).json({
      message: "Product not found or Unable to delete product",
      success: false,
      e,
    });
  }
  if (!product) {
    return res.status(500).json({
      message: "Product not found or Unable to delete product",
      success: false,
    });
  }
  return res
    .status(200)
    .json({ message: "Product Deleted successfully ", success: true });
};
//Get Product Details
exports.getProductDetail = async (req, res, next) => {
  let product;
  const id = req.params.id;
  try {
    product = await Product.findById(id);
  } catch (e) {
    console.log("Problem in get product details ");
    e.reason = "Invalid Product Id Did not found any product by this id";
    return res
      .status(404)
      .json({ message: "Product not found", success: false, e });
  }

  if (!product) {
    return res
      .status(404)
      .json({ message: "Product not found", success: false });
  }
  return res
    .status(200)
    .json({ message: "Here is your product", success: true, product });
};

//Create and Update review
exports.createAndUpdateProductReview = async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  let product;
  try {
    product = await Product.findById(productId);
  } catch (e) {
    console.log("Problem in find product for review");
    return res.status(404).json({ message: e.message, success: false });
  }

  if (!Product) {
    return res
      .status(404)
      .json({ message: "Product not found", success: false });
  }

  let isReviewed;

  try {
    isReviewed = await product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );
  } catch (e) {
    console.log("Problem in is reviewed");
    return res.status(500).json({ message: e.message, success: false });
  }
  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  product.ratings = avg / product.reviews.length;

  await product.save({
    validateBeforeSave: false,
  });

  return res.status(200).json({
    message: "Review submited successfully",
    success: true,
    isReviewed,
  });
};

//get a product all reviews
exports.getAProductAllReviews = async (req, res, next) => {
  let product;
  try {
    product = await Product.findById(req.query.id);
  } catch (e) {
    console.log("Problem in get product for see all reviews");
    return res.status(500).json({ message: e.message, success: false });
  }

  if (!product) {
    return res
      .status(404)
      .json({ message: "Product not found", success: false });
  }

  return res.status(200).json({
    message: "Here The Reviewses",
    success: true,
    reviews: product.reviews,
  });
};

//Delete reviews
exports.deleteReview = async (req, res, next) => {
  let product;

  try {
    product = await Product.findById(req.query.productId);
  } catch (e) {
    console.log("Problem in find product for delete reviews");
    return res.status(500).json({ message: e.message, success: false });
  }
  if (!product) {
    return res
      .status(404)
      .json({ message: "Product not found", success: false });
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;
  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  // product.reviews = reviews;
  // product.ratings = ratings;
  // product.numOfReviews = numOfReviews;

  // await product.save()
  try {
    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
  } catch (e) {
    console.log("problem in after delete update of a review");
    return res.status(500).json({ message: e.message, success: false });
  }
  return res
    .status(500)
    .json({ message: "Review deleted successfully", success: true, product });
};
