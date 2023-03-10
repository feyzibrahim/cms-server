const College = require("../models/collegeModel");
const mongoose = require("mongoose");

// Get All College

const getColleges = async (req, res) => {
  const user_id = req.user._id;

  const colleges = await College.find({ user_id });
  res.status(200).json(colleges);
};

// Get Single College

const getCollege = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ error: "Id is not valid please check again" });
  }

  const college = await College.findById(id);

  if (!college) {
    return res.status(404).json({ error: "No such College" });
  }

  res.status(200).json(college);
};

// Create new College

const createCollege = async (req, res) => {
  const { college_name, place, teachers_count, students_count, staff_count } =
    req.body;

  // add doc to db
  try {
    const user_id = req.user._id;
    const college = await College.create({
      college_name,
      place,
      teachers_count,
      students_count,
      staff_count,
      user_id,
    });
    res.status(200).json(college);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete College

const deleteCollege = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ error: "Id is not valid please check again" });
  }

  const college = await College.findOneAndDelete({ _id: id });

  if (!college) {
    return res.status(400).json({ error: "No such College" });
  }

  res.status(200).json(college);
};

// Update College

const updateCollege = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Id is not valid Please chec again" });
  }

  const college = await College.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
    { new: true }
  );

  if (!college) {
    return res.status(400).json({ error: "No such college" });
  }

  res.status(200).json(college);
};

// Exporting

module.exports = {
  getColleges,
  getCollege,
  createCollege,
  deleteCollege,
  updateCollege,
};
