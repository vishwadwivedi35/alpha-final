const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
// const apiRoutes = require("./routes/api");

app.use(express.json()); // Middleware to parse JSON bodies

const MONGODB_URI =
  "mongodb+srv://vishwadwivedi35:vishwaD@alphanutrition.m6aqfyy.mongodb.net/?retryWrites=true&w=majority&appName=alphaNutrition";

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log("MongoDB connection error:", err));

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
  })
);

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

app.use("/api/products", productRoutes);
app.use(bodyParser.json());
app.use("/api/orders", orderRoutes);

module.exports = app;
