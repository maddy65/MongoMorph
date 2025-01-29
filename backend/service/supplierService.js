import Supplier from "../models/Supplier.js"

const getAllSuppliers = async () => {
  return await Supplier.find()
    .populate("product")
    .populate("industry");
};

const getSupplierById = async (id) => {
  return await Supplier.findById(id)
    .populate("product")
    .populate("industry");
};

const createSupplier = async (supplierData) => {
  const supplier = new Supplier(supplierData);
  return await supplier.save();
};

const updateSupplier = async (id, updateData) => {
  return await Supplier.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

const deleteSupplier = async (id) => {
  return await Supplier.findByIdAndDelete(id);
};

export default {
  getAllSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
};
