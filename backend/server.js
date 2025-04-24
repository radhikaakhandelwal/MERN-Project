// Entry point for the API
import express from "express";
import dotenv from "dotenv";
import ConnectDB from "./config/db.js";
import Product from "./models/Product.model.js";

dotenv.config();
console.log(process.env.MONGO_URI);

const app = express();

app.post("/products", (req, res) => {
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
    newProduct.save();
    res.status(200).json({ success: true, data: newProduct });
  } catch (error) {}
});

app.listen(5000, () => {
  ConnectDB();
  console.log("Listening on port 5000!");
});
