import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import connectDB from "./config/db.js";
import supplierRoutes from "./routes/supplierRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import industryRoutes from "./routes/industryRoutes.js"

dotenv.config();


const app = express();
connectDB();

app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use("/api/suppliers", supplierRoutes);
app.use("/api/products", productRoutes);
app.use("/api/industries", industryRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

export { app };
