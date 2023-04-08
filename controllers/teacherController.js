const Teacher = require("../models/teacherModel");
const mongoose = require("mongoose");

// Get All Teacher

const getTeachers = async (req, res) => {
  const { q, departmentId } = req.query;
  if (q) {
    const teachers = await Teacher.find({
      user_id: { $regex: q },
      departmentId: { $regex: departmentId },
    });
    res.status(200).json(teachers);
  } else {
    const user_id = req.user._id;

    const teachers = await Teacher.find({ user_id });
    res.status(200).json(teachers);
  }
};

// Get Single Teacher

const getTeacher = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ error: "Id is not valid please check again" });
  }

  const teacher = await Teacher.findById(id);

  if (!teacher) {
    return res.status(404).json({ error: "No such Teacher" });
  }

  res.status(200).json(teacher);
};

// Create new Teacher

const createTeacher = async (req, res) => {
  // add doc to db
  try {
    const user_id = req.user._id;
    const teacher = await Teacher.create({
      ...req.body,
      user_id,
    });
    res.status(200).json(teacher);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Teacher

const deleteTeacher = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ error: "Id is not valid please check again" });
  }

  const teacher = await Teacher.findOneAndDelete({ _id: id });

  if (!teacher) {
    return res.status(400).json({ error: "No such Teacher" });
  }

  res.status(200).json(teacher);
};

// Update Teacher

const updateTeacher = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ error: "Id is not valid Please check again" });
  }

  const teacher = await Teacher.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
    { new: true }
  );

  if (!teacher) {
    return res.status(400).json({ error: "No such teacher" });
  }

  res.status(200).json(teacher);
};

// Exporting

module.exports = {
  getTeachers,
  getTeacher,
  createTeacher,
  deleteTeacher,
  updateTeacher,
};
