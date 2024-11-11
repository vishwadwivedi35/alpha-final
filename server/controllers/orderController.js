const Order = require("../models/order.models");
const mongoose = require("mongoose");

const createOrder = async (orderData) => {
  const {
    user,
    email,
    phone,
    paymentMethod,
    products,
    totalPrice,
    shippingAddress,
    status,
  } = orderData;

  console.log("Order data received:", orderData);

  const validatedProducts = products.map((product) => {
    if (!mongoose.Types.ObjectId.isValid(product.product)) {
      throw new Error(`Invalid product ID: ${product.product}`);
    }

    console.log("Product details:", {
      name: product.name,
      description: product.description,
    });

    return {
      product: new mongoose.Types.ObjectId(product.product),
      name: product.name,
      description: product.description,
      quantity: product.quantity,
      price: product.price,
      selectedSize: product.selectedSize,
      selectedFlavour: product.selectedFlavour,
    };
  });

  console.log("Validated products:", validatedProducts);

  const newOrder = new Order({
    user,
    email,
    phone,
    paymentMethod,
    products: validatedProducts,
    totalPrice,
    shippingAddress,
    status,
  });

  console.log("New order to save:", newOrder);

  return await newOrder.save();
};

module.exports = {
  createOrder,
};
