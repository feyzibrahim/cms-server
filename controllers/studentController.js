const Student = require("../models/studentModel");
const mongoose = require("mongoose");

// Get All Student

const getStudents = async (req, res) => {
  const { departmentId, year } = req.query;

  if (departmentId && year) {
    const students = await Student.find({
      department_id: { $regex: departmentId },
      year: { $eq: parseInt(year) },
    });

    res.status(200).json(students);
  } else {
    const user_id = req.user._id;
    const students = await Student.find({ user_id });
    res.status(200).json(students);
  }
};

// Get Single Student

const getStudent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ error: "Id is not valid please check again" });
  }

  const student = await Student.findById(id);

  if (!student) {
    return res.status(404).json({ error: "No such Student" });
  }

  res.status(200).json(student);
};

// Create new Student

const createStudent = async (req, res) => {
  // add doc to db
  try {
    const user_id = req.user._id;
    const student = await Student.create({
      ...req.body,
      user_id,
    });
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Student

const deleteStudent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ error: "Id is not valid please check again" });
  }

  const student = await Student.findOneAndDelete({ _id: id });

  if (!student) {
    return res.status(400).json({ error: "No such Student" });
  }

  res.status(200).json(student);
};

// Update Student

const updateStudent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ error: "Id is not valid Please check again" });
  }

  const student = await Student.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
    { new: true }
  );

  if (!student) {
    return res.status(400).json({ error: "No such student" });
  }

  res.status(200).json(student);
};

// Exporting

module.exports = {
  getStudents,
  getStudent,
  createStudent,
  deleteStudent,
  updateStudent,
};
