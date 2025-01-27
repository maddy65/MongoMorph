import express from "express";
import IndustryController from "../controllers/IndustryController.js";

const router = express.Router();

router.get("/", IndustryController.getIndustries);
router.post("/", IndustryController.createIndustry);
router.put("/:id", IndustryController.updateIndustry);
router.delete("/:id", IndustryController.deleteIndustry);

export default router;
