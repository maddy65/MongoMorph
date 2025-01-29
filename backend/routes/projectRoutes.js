import express from "express";
import ProjectController from "../controllers/ProjectController.js"; // Controller here

const router = express.Router();

router.get("/", ProjectController.getProject); // Get all suppliers
router.get("/:id", ProjectController.getProjectById); // Get a single supplier by ID
router.post("/", ProjectController.createProjects); // Create a new supplier
router.put("/:id", ProjectController.updateProject); // Update a supplier by ID
router.delete("/:id", ProjectController.deleteProject); // Delete a supplier by ID

export default router;
