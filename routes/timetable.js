const express = require("express");
const router = express.Router();
const timetableController = require("../controllers/timetableController");

router.get("/", timetableController.getTimetable);

// GET /timetable/:day
router.get("/:day", timetableController.getTimetableForDay);

// POST /timetable
router.post("/", timetableController.createTimetable);

// PUT /timetable/:day
router.put("/:day", timetableController.updateTimetableForDay);

// DELETE /timetable/:day
router.delete("/:day", timetableController.deleteTimetableForDay);

router.get(
  "/:teacherName/day/:day",
  timetableController.getPeriodsForTeacherOnDay
);

module.exports = router;
