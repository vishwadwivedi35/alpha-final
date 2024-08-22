// order.models.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: String,
    ref: "User",
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      selectedSize: {
        type: String,
        required: true,
      },
      selectedFlavour: {
        type: String,
        required: true,
      },
      longDescription: {
        type: String,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    // required: true,
  },
  shippingAddress: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
