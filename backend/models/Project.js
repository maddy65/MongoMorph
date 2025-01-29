import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  cin: { type: String },class: { type: String },
  projectName: { type: String },
  projectType: { type: String },
  implimentationStage: { type: String },
  costLACS: { type: String },
  LatestUpdate: { type: String }, 
  industry: { type: mongoose.Schema.Types.ObjectId, ref: "Industry", default: null }, 
  ownership: { type: String },
  location: { type: String },
  state: { type: String },
  promoterAddress: { type: String },
  contactNo: { type: String },
  contactPerson: { type: String },
  email: { type: String },
  remarks: { type: String },
  url: { type: String },
});
const Project = mongoose.model("Project", projectSchema);

export default Project;
