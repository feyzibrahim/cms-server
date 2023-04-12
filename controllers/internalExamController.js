const InternalExam = require("../models/internalExam");

// Add a new internal exam
exports.addInternalExam = async (req, res) => {
  try {
    const internalExam = await InternalExam.create({
      ...req.body,
    });

    res.status(201).json({
      internalExam,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all internal exams
exports.getAllInternalExams = async (req, res) => {
  try {
    const internalExams = await InternalExam.find();

    res.status(200).json({
      message: "Internal exams retrieved successfully",
      data: internalExams,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get internal exams by student ID
exports.getInternalExamsByStudent = async (req, res) => {
  try {
    const { student } = req.params;

    const internalExams = await InternalExam.find({ student }).populate(
      "subject"
    );

    res.status(200).json(internalExams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get internal exams by Teacher ID
exports.getInternalExamsByTeacher = async (req, res) => {
  try {
    const { teacher } = req.params;

    const internalExams = await InternalExam.find({ teacher })
      .populate("student", "student_name")
      .populate("subject", "name");

    res.status(200).json(internalExams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
