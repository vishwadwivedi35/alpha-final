const express = require("express");
const router = express.Router();
const {
  getProducts,
  postProduct,
  getProduct,
  deleteProduct,
} = require("../controllers/productController");

router.get("/", getProducts);
router.post("/", postProduct);
router.get("/:id", getProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
