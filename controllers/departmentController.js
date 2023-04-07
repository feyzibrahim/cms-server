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
    return res
      .status(400)
      .json({ error: "Id is not valid Please check again" });
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

const getSubjects = async (req, res) => {
  const { year } = req.query;
  try {
    const department = await Department.findById(req.params.id);
    let subjects = department.subjects;
    if (year) {
      subjects = subjects.filter((subject) => subject.year === parseInt(year));
    }
    res.status(200).json(subjects);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const createSubject = async (req, res) => {
  const user_id = req.user._id;
  const department = await Department.findById(req.params.id);
  if (!department) {
    return res.status(400).json({ error: "No such Department" });
  }
  const subject = { ...req.body, user_id };
  try {
    department.subjects.push(subject);
    await department.save();
    res.status(200).json(subject);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateSubject = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    const subject = department.subjects.id(req.params.subId);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }
    if (req.body.name) {
      subject.name = req.body.name;
    }
    if (req.body.code) {
      subject.code = req.body.code;
    }
    if (req.body.sem) {
      subject.sem = req.body.sem;
    }

    await department.save();
    res.json(subject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteSubject = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    const subject = department.subjects.id(req.params.subId);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }
    subject.remove();
    await department.save();
    res.json({ message: "Subject deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Exporting

module.exports = {
  getDepartments,
  getDepartment,
  createDepartment,
  deleteDepartment,
  updateDepartment,
  getSubjects,
  createSubject,
  updateSubject,
  deleteSubject,
};
