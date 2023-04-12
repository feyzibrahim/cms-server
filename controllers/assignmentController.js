const Assignment = require("../models/Assignment");

// Create a new assignment
exports.createAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.create({
      ...req.body,
    });
    res.status(201).json({ success: true, data: assignment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// Get all assignments in a semester
exports.getAssignmentsBySemester = async (req, res, next) => {
  try {
    const assignments = await Assignment.find({
      semester: req.params.semesterId,
    })
      .populate("subject", "name")
      .populate("semester")
      .populate("teacher", "teacherName");

    res.json(assignments);
  } catch (error) {
    next(error);
  }
};

// Get all assignments in a teacherId
exports.getAssignmentsByTeacher = async (req, res, next) => {
  try {
    const assignments = await Assignment.find({
      teacher: req.params.teacher,
    })
      .populate("subject", "name")
      .populate("semester")
      .populate("teacher", "teacherName");

    res.json(assignments);
  } catch (error) {
    next(error);
  }
};

// Get a single assignment by ID
exports.getAssignmentById = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res
        .status(404)
        .json({ success: false, error: "Assignment not found" });
    }
    res.status(200).json({ success: true, data: assignment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// Update an assignment by ID
exports.updateAssignmentById = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res
        .status(404)
        .json({ success: false, error: "Assignment not found" });
    }
    assignment.title = req.body.title || assignment.title;
    assignment.description = req.body.description || assignment.description;
    assignment.subject = req.body.subject || assignment.subject;
    assignment.teacher = req.body.teacher || assignment.teacher;
    assignment.dueDate = req.body.dueDate || assignment.dueDate;
    await assignment.save();
    res.status(200).json({ success: true, data: assignment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// Delete an assignment by ID
exports.deleteAssignmentById = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res
        .status(404)
        .json({ success: false, error: "Assignment not found" });
    }
    await assignment.remove();
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// Submit an assignment by a student
exports.submitAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res
        .status(404)
        .json({ success: false, error: "Assignment not found" });
    }
    // Check if the student has already submitted the assignment
    const studentSubmission = assignment.studentSubmissions.find(
      (submission) => submission.student.toString() === req.body.student
    );
    if (studentSubmission) {
      return res.status(400).json({
        success: false,
        error: "Assignment already submitted by the student",
      });
    }
    assignment.studentSubmissions.push({
      student: req.body.student,
      submissionDate: Date.now(),
      grade: null,
    });
    await assignment.save();
    res.status(200).json({ success: true, data: assignment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

exports.getAssignmentsDueSoonInSemester = async (req, res, next) => {
  try {
    const today = new Date();
    const assignments = await Assignment.find({
      dueDate: { $gte: today },
      semester: req.params.semesterId,
    })
      .populate("subject", "name")
      .populate("semester")
      .populate("teacher", "teacherName");
    res.json(assignments);
  } catch (error) {
    next(error);
  }
};
