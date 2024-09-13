// const Order = require("../models/order.models");
// const mongoose = require("mongoose");

// const createOrder = async (orderData) => {
//   const { user, email, products, totalPrice, shippingAddress, status } =
//     orderData;

//   // Log incoming data for debugging
//   console.log("Order data received:", orderData);

//   const validatedProducts = products.map((product) => {
//     if (!mongoose.Types.ObjectId.isValid(product.product)) {
//       throw new Error(`Invalid product ID: ${product.product}`);
//     }
//     return {
//       ...product,
//       product: mongoose.Types.ObjectId(product.product),
//     };
//   });

//   // Log the validated products for debugging
//   console.log("Validated products:", validatedProducts);

//   const newOrder = new Order({
//     user,
//     email,
//     products: validatedProducts,
//     totalPrice,
//     shippingAddress,
//     status,
//   });

//   // Log the new order object before saving
//   console.log("New order to save:", newOrder);

//   return await newOrder.save();
// };

// async function findOrderByPaymentRequestId(payment_request_id) {
//   return await Order.findOne({ payment_request_id });
// }

// module.exports = {
//   createOrder,
//   findOrderByPaymentRequestId,
// };

const Order = require("../models/order.models");
const mongoose = require("mongoose");

const createOrder = async (orderData) => {
  const { user, email, products, totalPrice, shippingAddress, status } =
    orderData;

  // Log incoming data for debugging
  console.log("Order data received:", orderData);

  const validatedProducts = products.map((product) => {
    if (!mongoose.Types.ObjectId.isValid(product.product)) {
      throw new Error(`Invalid product ID: ${product.product}`);
    }
    return {
      ...product,
      product: new mongoose.Types.ObjectId(product.product),
    };
  });

  // Log the validated products for debugging
  console.log("Validated products:", validatedProducts);

  const newOrder = new Order({
    user,
    email,
    products: validatedProducts,
    totalPrice,
    shippingAddress,
    status,
  });

  // Log the new order object before saving
  console.log("New order to save:", newOrder);

  return await newOrder.save();
};

async function findOrderByPaymentRequestId(payment_request_id) {
  return await Order.findOne({ payment_request_id });
}

module.exports = {
  createOrder,
  findOrderByPaymentRequestId,
};
