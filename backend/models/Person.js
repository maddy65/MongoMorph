import mongoose from "mongoose";

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  companyName: { type: String, required: true },
  designations: { type: String },
  contactNo: { type: String },
  emailOffice: { type: String },
  emailPersonal: { type: String },
  pastCompanies: { type: String }, 
  linkdinURL: { type: String },
  facebookProfile: { type: String },
  requirment: { type: String },
  behaviourlPOV: { type: String },
  followUp: { type: String },
  leadNumber: { type: String },
  incharge: { type: String },
  remarks: { type: String },
});
const Person = mongoose.model("Person", personSchema);
export default Person;