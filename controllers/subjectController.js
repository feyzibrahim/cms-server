const Subject = require("../models/Subject");

exports.createSubject = async (req, res) => {
  try {
    const newSubject = new Subject({ ...req.body });
    await newSubject.save();
    res.status(201).json({ message: "Subject created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getSubjects = async (req, res) => {
  try {
    const { department, semester } = req.query;
    if (department && semester) {
      const subjects = await Subject.find({ department, semester });
      res.status(200).json({ subjects });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getSubjectsByDepartment = async (req, res) => {
  const department = req.params.department;
  try {
    if (department) {
      const subjects = await Subject.find({ department });
      res.status(200).json({ subjects });
    } else {
      res.status(404).json({ message: "Department Not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getSubjectById = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }
    res.status(200).json({ subject });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateSubject = async (req, res) => {
  try {
    const { name, code, department, semester } = req.body;
    const updatedSubject = await Subject.findByIdAndUpdate(
      req.params.id,
      { name, code, department, semester },
      { new: true }
    ).populate("department semester");
    if (!updatedSubject) {
      return res.status(404).json({ message: "Subject not found" });
    }
    res.status(200).json({
      message: "Subject updated successfully",
      subject: updatedSubject,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSubject = await Subject.findByIdAndDelete(id);

    if (!deletedSubject) {
      return res.status(404).json({ error: "Subject not found" });
    }

    res.status(200).json({ message: "Subject deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getSubjectsBySemester = async (req, res) => {
  const semesterId = req.params.semesterId;
  try {
    const subjects = await Subject.find({ semester: semesterId }).populate(
      "department"
    );
    if (subjects.length === 0) {
      return res
        .status(404)
        .json({ message: "No subjects found for this semester" });
    }
    return res.status(200).json(subjects);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
