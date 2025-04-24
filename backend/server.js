// Entry point for the API
import express from "express";
import dotenv from "dotenv";

import ConnectDB from "./config/db.js";
import ProductRoutes from "./routes/product.js";

dotenv.config();
console.log(process.env.MONGO_URI);

const app = express();

app.use(express.json()); //to use json data in req.body - POST request
app.use("/api/products", ProductRoutes);

app.listen(5000, () => {
  ConnectDB();
  console.log("Listening on port 5000!");
});
