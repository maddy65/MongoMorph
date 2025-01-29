import Project from "../models/Project.js"

const getAllProjects = async () => {
  return await Project.find()
    .populate("industry")
    .populate("companyName")
    .populate("cin");
};

const getProjectById = async (id) => {
  return await Project.findById(id)
    .populate("industry")
    .populate("companyName")
    .populate("cin");
};

const createProject = async (projectData) => {
  const project = new Project(projectData);
  return await project.save();
};

const updateProject = async (id, updateData) => {
  return await Project.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

const deleteProject = async (id) => {
  return await Project.findByIdAndDelete(id);
};


export default {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};
