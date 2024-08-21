const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const app = express();
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
// const apiRoutes = require("./routes/api");

app.use(express.json()); // Middleware to parse JSON bodies
dotenv.config();

const mongoUri = process.env.MONGO_URI;
mongoose
  .connect(mongoUri)
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log("MongoDB connection error:", err));

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:9000",
      "https://res.cloudinary.com",
      "https://alphamuscle.in",
    ],
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // or specific origin
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api/products", productRoutes);
app.use(bodyParser.json());
app.use("/api/orders", orderRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "public")));

// Catchall handler for any requests that don't match API routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

module.exports = app;
