// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
//   longDescription: {
//     type: String,
//     required: true,
//   },
//   images: [
//     {
//       type: String,
//     },
//   ],
//   category: {
//     type: String,
//     enum: [
//       "Whey Protein",
//       "Weight And Mass Gainers",
//       "Pre and Post Workouts",
//       "Daily Essentials",
//     ],
//     required: true,
//   },
//   sizes: [
//     {
//       type: String,
//     },
//   ], // New field for sizes
//   flavours: [
//     {
//       type: String,
//     },
//   ], // New field for flavours
// });

// const Product = mongoose.model("Product", productSchema);

// module.exports = Product;

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  mrp: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  longDescription: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
    },
  ],
  category: {
    type: String,
    enum: [
      "Whey Protein",
      "Weight And Mass Gainers",
      "Pre and Post Workouts",
      "Daily Essentials",
    ],
    required: true,
  },
  sizes: [
    {
      type: String,
    },
  ],
  flavours: [
    {
      type: String,
    },
  ],
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
