// db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://vishwadwivedi35:vishwaD@alphanutrition.m6aqfyy.mongodb.net/?retryWrites=true&w=majority&appName=alphaNutrition"
    );
    console.log("MongoDB connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
