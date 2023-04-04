const express = require("express");

const {
  getEvents,
  getEvent,
  createEvent,
  deleteEvent,
  updateEvent,
  getEventsForSubUsers,
} = require("../controllers/eventController");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.get("/", getEvents);

router.get("/:id", getEvent);

router.post("/", createEvent);

router.delete("/:id", deleteEvent);

router.patch("/:id", updateEvent);

router.get("/e/search", getEventsForSubUsers);

module.exports = router;
