const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendanceController");

// Get all attendance records
router.get("/", attendanceController.getAttendance);

// Get attendance record by ID
router.get("/:id", attendanceController.getAttendanceById);

// Create a new attendance record
router.post("/", attendanceController.createAttendance);

// Update an attendance record
router.put("/:id", attendanceController.updateAttendance);

// Delete an attendance record
router.delete("/:id", attendanceController.deleteAttendance);

router.post("/multiple", attendanceController.createMultipleAttendance);

router.get(
  "/:studentId/:semester/stats",
  attendanceController.getAttendanceStatistics
);

router.get(
  "/:studentId/:semester/dates",
  attendanceController.getDistinctDates
);

router.get(
  "/:studentId/:semester/:date",
  attendanceController.getAttendanceByDate
);

module.exports = router;
