const Semester = require("../models/Semester");

// get all semesters for a department
exports.getSemestersByDepartment = async (req, res) => {
  try {
    const { departmentId } = req.query;
    if (departmentId) {
      const semesters = await Semester.find({
        departmentId,
      });
      res.json(semesters);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// create a new semester
exports.createSemester = async (req, res) => {
  try {
    const user_id = req.user._id;
    const semester = await Semester.create({ ...req.body, user_id });
    res.status(201).json(semester);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// update a semester by id
exports.updateSemesterById = async (req, res) => {
  try {
    const semester = await Semester.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!semester) {
      return res.status(404).json({ message: "Semester not found" });
    }
    res.json(semester);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// delete a semester by id
exports.deleteSemesterById = async (req, res) => {
  try {
    const semester = await Semester.findByIdAndDelete(req.params.id);
    if (!semester) {
      return res.status(404).json({ message: "Semester not found" });
    }
    res.json({ message: "Semester deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
