const express = require("express");
const router = express.Router();
const assignmentController = require("../controllers/assignmentController");

// Get all assignments in particular Semester
router.get(
  "/semester/:semesterId",
  assignmentController.getAssignmentsBySemester
);

//By teacher id
router.get("/teacher/:teacher", assignmentController.getAssignmentsByTeacher);

// Get a single assignment
router.get("/:id", assignmentController.getAssignmentById);

// Create a new assignment
router.post("/", assignmentController.createAssignment);

// Update an existing assignment
router.put("/:id", assignmentController.updateAssignmentById);

// Delete an assignment
router.delete("/:id", assignmentController.deleteAssignmentById);

// Submit an assignment by a student
router.post("/:id/submit", assignmentController.submitAssignment);

// Get assignments which are due
router.get(
  "/semester/:semesterId/due-soon",
  assignmentController.getAssignmentsDueSoonInSemester
);

module.exports = router;
