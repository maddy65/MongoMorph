import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import connectDB from "./config/db.js";
import supplierRoutes from "./routes/supplierRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import industryRoutes from "./routes/industryRoutes.js";
import companyRoutes from "./routes/companyRoutes.js"
import projectRoutes from "./routes/projectRoutes.js"
import personRoutes from "./routes/personRoutes.js"

dotenv.config();


const app = express();
connectDB();

app.use(cors({
  origin: 'http://localhost:3001', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// Middleware
app.use(express.json());

// Routes
app.use("/api/suppliers", supplierRoutes);
app.use("/api/products", productRoutes);
app.use("/api/industries", industryRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/persons", personRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

export { app };
