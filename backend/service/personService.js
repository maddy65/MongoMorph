import Person from "../models/Person.js"

const getAllPerson = async () => {
  return await Person.find()
    .populate("companyName", "name");
};

const getPersonById = async (id) => {
  return await Person.findById(id)
  .populate("companyName", "name");
};

const createPerson = async (personData) => {
  const person = new Person(personData);
  return await person.save();
};

const updatePerson = async (id, updateData) => {
  return await Person.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

const deletePerson = async (id) => {
  return await Person.findByIdAndDelete(id);
};


export default {
  getAllPerson,
  getPersonById,
  createPerson,
  updatePerson,
  deletePerson
};
