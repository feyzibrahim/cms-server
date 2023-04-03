const Management = require("../models/managementModel");
const mongoose = require("mongoose");

// Get All Management

const getManagements = async (req, res) => {
  const user_id = req.user._id;

  const managements = await Management.find({ user_id });
  res.status(200).json(managements);
};

// Get Single Management

const getManagement = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ error: "Id is not valid please check again" });
  }

  const management = await Management.findById(id);

  if (!management) {
    return res.status(404).json({ error: "No such Management" });
  }

  res.status(200).json(management);
};

// Create new Management

const createManagement = async (req, res) => {
  const {
    managerName,
    email,
    password,
    registrationNumber,
    gender,
    roll,
    mobileNumber,
    dob,
    joiningDate,
    salary,
  } = req.body;

  // add doc to db
  try {
    const user_id = req.user._id;
    const management = await Management.create({
      managerName,
      email,
      password,
      registrationNumber,
      gender,
      roll,
      mobileNumber,
      dob,
      joiningDate,
      salary,
      user_id,
    });
    res.status(200).json(management);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Management

const deleteManagement = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ error: "Id is not valid please check again" });
  }

  const management = await Management.findOneAndDelete({ _id: id });

  if (!management) {
    return res.status(400).json({ error: "No such Management" });
  }

  res.status(200).json(management);
};

// Update Management

const updateManagement = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ error: "Id is not valid Please check again" });
  }

  const management = await Management.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
    { new: true }
  );

  if (!management) {
    return res.status(400).json({ error: "No such management" });
  }

  res.status(200).json(management);
};

// Exporting

module.exports = {
  getManagements,
  getManagement,
  createManagement,
  deleteManagement,
  updateManagement,
};
