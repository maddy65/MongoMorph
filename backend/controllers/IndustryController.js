import IndustryService from "../service/industryService.js";

class IndustryController {
  static async getIndustries(req, res) {
    try {
      const industries = await IndustryService.getAllProduct();
      res.status(200).json(industries);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async createIndustry(req, res) {
    try {
      const newIndustry = await IndustryService.createIndustry(req.body);
      res.status(201).json(newIndustry);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateIndustry(req, res) {
    try {
      const updatedIndustry = await IndustryService.updateIndustry(req.params.id, req.body);
      res.status(200).json(updatedIndustry);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteIndustry(req, res) {
    try {
      await IndustryService.deleteIndustry(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default IndustryController;
