import express from "express";
import SupplierController from "../controllers/supplierController.js"; // Controller here

const router = express.Router();

router.get("/", SupplierController.getSuppliers); // Get all suppliers
router.get("/:id", SupplierController.getSupplierById); // Get a single supplier by ID
router.post("/", SupplierController.createSupplier); // Create a new supplier
router.put("/:id", SupplierController.updateSupplier); // Update a supplier by ID
router.delete("/:id", SupplierController.deleteSupplier); // Delete a supplier by ID

export default router;
