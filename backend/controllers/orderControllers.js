//external imports
//

//internal imports
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
//

//create new order
exports.newOrder = async (req, res, next) => {
  const {
    shippingInfo,
    orderItem,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  let order;
  try {
    order = await Order.create({
      shippingInfo,
      orderItem,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
      user: req.user._id,
    });
  } catch (e) {
    console.log("Problem in crate neq order");
    return res.status(500).json({ message: e.message, success: false });
  }
  if (!order) {
    return res
      .status(500)
      .json({ message: "Unable to create order", success: false });
  }
  return res
    .status(200)
    .json({ message: "Order created successfully", success: true, order });
};

//get single order
exports.getAOrder = async (req, res, next) => {
  let order;
  try {
    order = await Order.findById(req.params.id).populate("user", "name email");
  } catch (e) {
    let err = e.message;
    err = "No product found by this id";
    console.log("Problem in get a single order");
    return res.status(401).json({ message: err, success: false });
  }

  if (!order) {
    return res.status(404).json({ message: "Order not found", success: false });
  }

  return res
    .status(200)
    .json({ message: "Here is the order", success: true, order });
};

//get all my orders
exports.getMyOrders = async (req, res, next) => {
  let orders;

  try {
    orders = await Order.find({ user: req.user._id });
  } catch (e) {
    console.log("Problem in Get All my orders");
    return res.status(400).json({ message: e.message, success: false });
  }

  if (!orders) {
    return res.status(401).json({ message: "Have no order", success: false });
  }
  return res
    .status(200)
    .json({ message: "Here is the orders", success: false, orders });
};

//get all orders --admin
exports.getAllOrdersByAdmin = async (req, res, next) => {
  let orders;
  let totalAmount = 0;

  try {
    orders = await Order.find();
  } catch (e) {
    console.log("Get All orders by admin");
    return res.status(400).json({ message: e.message, success: false });
  }
  if (!orders) {
    return res.status(404).json({ message: "No order found", success: false });
  }

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });
  return res
    .status(200)
    .json({ message: "Here All orders", success: true, orders, totalAmount });
};

//update order status --admin
exports.updateOrder = async (req, res, next) => {
  let order;
  try {
    order = await Order.findById(req.params.id);
  } catch (e) {
    console.log(e.message);
    return res
      .status(401)
      .json({ message: "Unable to update", success: false });
  }
  if (!order) {
    return res.status(404).json({ message: "Order not found", success: false });
  }

  if (order.orderStatus === "Delivered") {
    return res.status(400).json({
      message: "You have already Delivered this order",
      success: false,
    });
  }
  order.orderItem.forEach(async (order) => {
    await updatStock(order.product, order.quantity);
  });

  order.orderStatus = req.body.orderStatus;

  if (order.orderStatus === "Delivered") {
    order.deliveredAt = Date.now();
  }
  await order.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json({ message: "Order is Delivered", success: true, order });
};

async function updatStock(id, quantity) {
  let product;
  try {
    product = await Product.findById(id);
  } catch (e) {
    console.log("Problem in find produt in update stock");
  }

  product.Stock -= quantity;
  await product.save({ validateBeforeSave: false });
}

//Delete order  --admin
exports.deleteOrder = async (req, res, next) => {
  let order;

  try {
    order = await Order.findById(req.params.id);
  } catch (e) {
    console.log(e.message);
    return res
      .status(200)
      .json({ message: "Unable to delete", success: false });
  }
  if (!order) {
    return res
      .status(200)
      .json({ message: "NO order found by this id", success: false });
  }

  await order.remove();
  return res
    .status(200)
    .json({ message: "Order Deleted successfully", success: true, order });
};
