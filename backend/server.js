// Entry point for the API
import express from "express";
import dotenv from "dotenv";
import path from "path";
import ConnectDB from "./config/db.js";
import ProductRoutes from "./routes/product.js";

dotenv.config();
console.log("MONGO_URI =", process.env.MONGO_URI);

const app = express();

const __dirname = path.resolve();

app.use(express.json()); //to use json data in req.body - POST request

app.use("/api/products", ProductRoutes);

// if we have deployed this application
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("/{*any}", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(5000, () => {
  ConnectDB();
  console.log("Listening on port 5000!");
});
