import express from "express";
import SupplierController from "../controllers/supplierController.js"; // Controller here
import personController from "../controllers/personController.js";

const router = express.Router();

router.get("/", personController.getPersons); // Get all suppliers
router.get("/:id", personController.getPersonById); // Get a single supplier by ID
router.post("/", personController.createPerson); // Create a new supplier
router.put("/:id", personController.updatePerson); // Update a supplier by ID
router.delete("/:id", personController.deletePerson); // Delete a supplier by ID

export default router;
