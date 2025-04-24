import express from "express";
import {
  getProducts,
  createProducts,
  deleteProducts,
  updateProducts,
} from "../controllers/products.controllers.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", createProducts);
router.delete("/:id", deleteProducts);
router.put("/:id", updateProducts);

export default router;
