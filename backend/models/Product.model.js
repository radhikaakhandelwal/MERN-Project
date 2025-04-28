import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true, // makes sure there is createdAt and updatedAt in each one
  }
);

// 'Product' is a object
const Product = mongoose.model("Product", productSchema);

export default Product;
