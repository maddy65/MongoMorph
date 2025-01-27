import mongoose from "mongoose";
import SupplierService from "../service/supplierService.js";

const getSuppliers = async (req, res) => {
  try {
    const suppliers = await SupplierService.getAllSuppliers();
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch suppliers", error });
  }
};

const getSupplierById = async (req, res) => {
  try {
    const supplier = await SupplierService.getSupplierById(req.params.id);
    if (!supplier) return res.status(404).json({ message: "Supplier not found" });
    res.status(200).json(supplier);
  } catch (error) {
    res.status(500).json({ message: "Error fetching supplier", error });
  }
};

const createSupplier = async (req, res) => {
  try {
    const data = req.body;

    // Set product and industry to null if empty or undefined
    data.product = data.product && data.product.length > 0
      ? data.product.map((id) => mongoose.Types.ObjectId(id))
      : null;

    data.industry = data.industry && data.industry.length > 0 ? data.industry : null;

    console.log("Mapped product IDs:", data.product);

    // Call service to create supplier
    const supplier = await SupplierService.createSupplier(data);
    res.status(201).json(supplier);
  } catch (error) {
    console.error("Error creating supplier:", error.message);

    res.status(400).json({
      message: "Failed to create supplier",
      error: error.message,
    });
  }
};


const updateSupplier = async (req, res) => {
  try {
    const supplier = await SupplierService.updateSupplier(req.params.id, req.body);
    if (!supplier) return res.status(404).json({ message: "Supplier not found" });
    res.status(200).json(supplier);
  } catch (error) {
    res.status(400).json({ message: "Failed to update supplier", error });
  }
};

const deleteSupplier = async (req, res) => {
  try {
    const supplier = await SupplierService.deleteSupplier(req.params.id);
    if (!supplier) return res.status(404).json({ message: "Supplier not found" });
    res.status(200).json({ message: "Supplier deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete supplier", error });
  }
};

export default {
  getSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
};
