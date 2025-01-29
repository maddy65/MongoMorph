import CompanyService from "../service/companyService.js";

const getCompanies = async (req, res) => {
  try {
    const companies = await CompanyService.getAllCompanies();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch companies", error });
  }
};

const getCompaniesById = async (req, res) => {
  try {
    const companies = await CompanyService.getCompanyById(req.params.id);
    if (!companies) return res.status(404).json({ message: "Companies not found" });
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching companies", error });
  }
};

const createCompany = async (req, res) => {
  try {
    const data = req.body;
    data.industry = data.industry && data.industry.length > 0 ? data.industry : null;
    const company = await CompanyService.createCompany(data);
    res.status(201).json(company);
  } catch (error) {
    console.error("Error creating company:", error.message);

    res.status(400).json({
      message: "Failed to create company",
      error: error.message,
    });
  }
};


const updateCompany = async (req, res) => {
  try {
    const company = await CompanyService.updateCompany(req.params.id, req.body);
    if (!company) return res.status(404).json({ message: "company not found" });
    res.status(200).json(company);
  } catch (error) {
    res.status(400).json({ message: "Failed to update company", error });
  }
};



const deleteCompany = async (req, res) => {
  try {
    const company = await CompanyService.deleteCompany(req.params.id);
    if (!company) return res.status(404).json({ message: "company not found" });
    res.status(200).json({ message: "company deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete company", error });
  }
};

const getCompanyNames = async(req, res) =>{
  try{
    const companyNames = await CompanyService.getCompanyNames();
    res.status(200).json(companyNames);

  }catch (error){
    res.status(500).json({ message: "Failed to get Companies", error });
  }
}

const getCompanyNamesAndCIN = async(req, res) =>{
  try{
    const companyNamesAndCin = await CompanyService.getCompanyNamesAndCIN();
    res.status(200).json(companyNamesAndCin);

  }catch (error){
    res.status(500).json({ message: "Failed to get Companies Name and CIN", error });
  }
}  




export default {
  getCompanies,
  getCompaniesById,
  createCompany,
  updateCompany,
  deleteCompany,
  getCompanyNames,
  getCompanyNamesAndCIN
};
