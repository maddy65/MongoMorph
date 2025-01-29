import ProjectService from "../service/projectService.js";

const getProject = async (req, res) => {
  try {
    const projects = await ProjectService.getAllProjects();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch projects", error });
  }
};

const getProjectById = async (req, res) => {
  try {
    const projects = await ProjectService.getProjectById(req.params.id);
    if (!projects) return res.status(404).json({ message: "Projects not found" });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching projects", error });
  }
};

const createProjects = async (req, res) => {
  try {
    const data = req.body;
    data.industry = data.industry && data.industry.length > 0 ? data.industry : null;
    data.companyNames = data.companyNames && data.companyNames.length > 0 ? data.companyNames : null;
    const projects = await ProjectService.createProject(data);
    res.status(201).json(projects);
  } catch (error) {
    console.error("Error creating Project:", error.message);

    res.status(400).json({
      message: "Failed to create project",
      error: error.message,
    });
  }
};


const updateProject = async (req, res) => {
  try {
    const project = await ProjectService.updateProject(req.params.id, req.body);
    if (!project) return res.status(404).json({ message: "project not found" });
    res.status(200).json(project);
  } catch (error) {
    res.status(400).json({ message: "Failed to update project", error });
  }
};



const deleteProject = async (req, res) => {
  try {
    const project = await ProjectService.deleteProject(req.params.id);
    if (!project) return res.status(404).json({ message: "projects not found" });
    res.status(200).json({ message: "projects deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete Project", error });
  }
};



export default {
  getProject,
  getProjectById,
  createProjects,
  updateProject,
  deleteProject
};
