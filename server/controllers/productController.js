const Product = require("../models/product.models");

// const getProducts = async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.status(200).json(products);
//   } catch (err) {
//     res.status(500).json({ error: "Server error" });
//   }
// };
const getProducts = async (req, res) => {
  try {
    const { category } = req.query; // Get the category from query parameters

    let query = {};
    if (category && category !== "All") {
      query.category = category;
    }

    const products = await Product.find(query);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const postProduct = async (req, res) => {
  try {
    const { name, description, price, mrp, images, category } = req.body;

    if (!mrp || mrp <= price) {
      return res
        .status(400)
        .json({ error: "MRP must be greater than the selling price." });
    }

    const newProduct = new Product({
      name,
      description,
      price,
      mrp, // Ensure the MRP is saved
      images,
      category,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: "Error creating product" });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

async function deleteProduct(req, res) {
  const productId = req.params.id;

  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (deletedProduct) {
      return res.status(200).json(deletedProduct);
    } else {
      return res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  getProducts,
  postProduct,
  getProduct,
  deleteProduct,
};
