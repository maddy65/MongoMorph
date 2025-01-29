import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
  supplierName: { type: String, required: true },
  product: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product", default: null }], 
  class: { type: String },
  contactNo: { type: String },
  email: { type: String },
  url: { type: String },
  city: { type: String },
  state: { type: String }, 
  category: { type: String },
  subCategory: { type: String },
  industry: { type: mongoose.Schema.Types.ObjectId, ref: "Industry", default: null }, 
  application: { type: String },
});

//module.exports = mongoose.model("Supplier", supplierSchema);

const Supplier = mongoose.model("Supplier", supplierSchema);

export default Supplier;