import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  cin: { type: String },
  industry: { type: mongoose.Schema.Types.ObjectId, ref: "Industry", default: null },
  scale: { type: String },
  contactNo: { type: String },
  url: { type: String },
  email : {type: String},
  city: { type: String },
  state: { type: String }, 
  webPresence: { type: String }, 
  address: { type: String }, 
  communicationRemarks: { type: String }, 
  filledBy: { type: String }, 
});

//module.exports = mongoose.model("Supplier", companySchema);

const Company = mongoose.model("Company", companySchema);

export default Company;