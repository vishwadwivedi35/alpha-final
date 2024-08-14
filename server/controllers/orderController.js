const Order = require("../models/order.models");

const createOrder = async (orderData) => {
  const { user, email, products, totalPrice, shippingAddress, status } =
    orderData;

  const newOrder = new Order({
    user,
    email,
    products,
    totalPrice,
    shippingAddress,
    status,
  });

  return await newOrder.save();
};

module.exports = {
  createOrder,
};
