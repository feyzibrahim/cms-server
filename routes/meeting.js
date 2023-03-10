const express = require("express");

const {
  getMeetings,
  getMeeting,
  createMeeting,
  deleteMeeting,
  updateMeeting,
} = require("../controllers/meetingController");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.get("/", getMeetings);

router.get("/:id", getMeeting);

router.post("/", createMeeting);

router.delete("/:id", deleteMeeting);

router.patch("/:id", updateMeeting);

module.exports = router;
