const Staff = require("../models/staffModel");
const mongoose = require("mongoose");

// Get All Staff

const getStaffs = async (req, res) => {
  const user_id = req.user._id;

  const staffs = await Staff.find({ user_id });
  res.status(200).json(staffs);
};

// Get Single Staff

const getStaff = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ error: "Id is not valid please check again" });
  }

  const staff = await Staff.findById(id);

  if (!staff) {
    return res.status(404).json({ error: "No such Staff" });
  }

  res.status(200).json(staff);
};

// Create new Staff

const createStaff = async (req, res) => {
  const {
    staffName,
    email,
    password,
    registrationNumber,
    gender,
    duty,
    mobileNumber,
    dob,
    joiningDate,
    salary,
  } = req.body;

  // add doc to db
  try {
    const user_id = req.user._id;
    const staff = await Staff.create({
      staffName,
      email,
      password,
      registrationNumber,
      gender,
      duty,
      mobileNumber,
      dob,
      joiningDate,
      salary,
      user_id,
    });
    res.status(200).json(staff);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Staff

const deleteStaff = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ error: "Id is not valid please check again" });
  }

  const staff = await Staff.findOneAndDelete({ _id: id });

  if (!staff) {
    return res.status(400).json({ error: "No such Staff" });
  }

  res.status(200).json(staff);
};

// Update Staff

const updateStaff = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ error: "Id is not valid Please check again" });
  }

  const staff = await Staff.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
    { new: true }
  );

  if (!staff) {
    return res.status(400).json({ error: "No such staff" });
  }

  res.status(200).json(staff);
};

// Exporting

module.exports = {
  getStaffs,
  getStaff,
  createStaff,
  deleteStaff,
  updateStaff,
};
