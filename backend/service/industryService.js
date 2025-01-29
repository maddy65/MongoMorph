import Industry from "../models/Industry.js";

class IndustryService {
  static async getAllProduct() {
    try {
      return await Industry.find();
    } catch (error) {
      throw new Error("Error fetching industries: " + error.message);
    }
  }

  static async createIndustry(industryData) {
    try {
      const newIndustry = new Industry(industryData);
      return await newIndustry.save();
    } catch (error) {
      throw new Error("Error creating industry: " + error.message);
    }
  }

  static async updateIndustry(id, industryData) {
    try {
      return await Industry.findByIdAndUpdate(id, industryData, { new: true });
    } catch (error) {
      throw new Error("Error updating industry: " + error.message);
    }
  }

  static async deleteIndustry(id) {
    try {
      return await Industry.findByIdAndDelete(id);
    } catch (error) {
      throw new Error("Error deleting industry: " + error.message);
    }
  }
}

export default IndustryService;
