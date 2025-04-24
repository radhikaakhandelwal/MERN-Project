import Product from "../models/Product.model.js";

// GET PRODUCTS
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}); //passing an empty obj {} means fetch all prodcuts
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("Error while fetching all products:", error.message);
    res
      .status(400)
      .json({ success: false, message: "Could not fetch products" });
  }
};

// CREATE PRODUCTS
export const createProducts = async (req, res) => {
  const product = req.body; //user will send this data

  //   apply validation to user sent data
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields!" });
  }

  //   'Product' is an object coming from "./models/Product.model.js"
  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.log("Error while creating product:", error.message);
    res.status(500).json({ success: false, message: "Server error!" });
  }
};

// DELETE PRODUCTS
export const deleteProducts = async (req, res) => {
  let { id } = req.params;
  console.log(id);
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted!" });
  } catch (error) {
    console.log("Error while deleting product:", error.message);
    res
      .status(404)
      .json({ success: false, message: "Product not found to delete" });
  }
};

// UPDATE PRODUCTS
export const updateProducts = async (req, res) => {
  let { id } = req.params;
  const product = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.log("Error while updating product:", error.message);
    res.status(500).json({ success: false, message: "Product not updated" });
  }
};
