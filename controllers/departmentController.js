const Department = require("../models/departmentModel");
const mongoose = require("mongoose");

// Get All Department

const getDepartments = async (req, res) => {
  const user_id = req.user._id;

  const departments = await Department.find({ user_id });
  res.status(200).json(departments);
};

// Get Single Department

const getDepartment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ error: "Id is not valid please check again" });
  }

  const departments = await Department.findById(id);

  if (!departments) {
    return res.status(404).json({ error: "No such departments" });
  }

  res.status(200).json(departments);
};

// Create new Department

const createDepartment = async (req, res) => {
  const { department_name, year_count, hod, teacher_count, students_count } =
    req.body;

  // add doc to db
  try {
    const user_id = req.user._id;
    const department = await Department.create({
      department_name,
      year_count,
      hod,
      teacher_count,
      students_count,
      user_id,
    });
    res.status(200).json(department);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Department

const deleteDepartment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ error: "Id is not valid please check again" });
  }

  const department = await Department.findOneAndDelete({ _id: id });

  if (!department) {
    return res.status(400).json({ error: "No such Department" });
  }

  res.status(200).json(department);
};

// Update Department

const updateDepartment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Id is not valid Please chec again" });
  }

  const department = await Department.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
    { new: true }
  );

  if (!department) {
    return res.status(400).json({ error: "No such Department" });
  }

  res.status(200).json(department);
};

// Exporting

module.exports = {
  getDepartments,
  getDepartment,
  createDepartment,
  deleteDepartment,
  updateDepartment,
};
