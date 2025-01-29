import Company from "../models/Company.js"

const getAllCompanies = async () => {
  return await Company.find()
    .populate("industry");
};

const getCompanyById = async (id) => {
  return await Company.findById(id)
    .populate("industry");
};

const createCompany = async (companyData) => {
  const company = new Company(companyData);
  return await company.save();
};

const updateCompany = async (id, updateData) => {
  return await Company.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

const deleteCompany = async (id) => {
  return await Company.findByIdAndDelete(id);
};

const getCompanyNames = async () => {
  return await Company.find({}, "companyName"); 
};

const getCompanyNamesAndCIN = async () => {
  return await Company.find({}, {companyName : 1,cin: 1});
};


export default {
  getAllCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
  getCompanyNames,
  getCompanyNamesAndCIN
};
