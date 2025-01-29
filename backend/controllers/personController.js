import PersonService from "../service/personService.js";

const getPersons = async (req, res) => {
  try {
    const persons = await PersonService.getAllPerson();
    res.status(200).json(persons);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch companies", error });
  }
};

const getPersonById = async (req, res) => {
  try {
    const persons = await PersonService.getPersonById(req.params.id);
    if (!persons) return res.status(404).json({ message: "persons not found" });
    res.status(200).json(persons);
  } catch (error) {
    res.status(500).json({ message: "Error fetching companies", error });
  }
};

const createPerson = async (req, res) => {
  try {
    const data = req.body;
    const person = await PersonService.createPerson(data);
    res.status(201).json(person);
  } catch (error) {
    console.error("Error creating person:", error.message);

    res.status(400).json({
      message: "Failed to create person",
      error: error.message,
    });
  }
};


const updatePerson = async (req, res) => {
  try {
    const person = await PersonService.updatePerson(req.params.id, req.body);
    if (!person) return res.status(404).json({ message: "person not found" });
    console.log("Updated")
    res.status(200).json(person);
  } catch (error) {
    res.status(400).json({ message: "Failed to update person", error });
  }
};



const deletePerson = async (req, res) => {
  try {
    const person = await PersonService.deletePerson(req.params.id);
    if (!person) return res.status(404).json({ message: "person not found" });
    res.status(200).json({ message: "person deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete person", error });
  }
};



export default {
  getPersons,
  getPersonById,
  createPerson,
  updatePerson,
  deletePerson
};
