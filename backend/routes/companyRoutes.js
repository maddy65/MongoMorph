import express from "express";
import CompanyController from "../controllers/CompanyController.js"; // Controller here

const router = express.Router();

router.get("/", CompanyController.getCompanies); 
router.get("/names", CompanyController.getCompanyNames); 
router.get("/names-and-cin", CompanyController.getCompanyNamesAndCIN); 
router.get("/:id", CompanyController.getCompaniesById); 
router.post("/", CompanyController.createCompany); // Create a new Company
router.put("/:id", CompanyController.updateCompany); // Update a Company by ID
router.delete("/:id", CompanyController.deleteCompany); // Delete a Company by ID




export default router;
