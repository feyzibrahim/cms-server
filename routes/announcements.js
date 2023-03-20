const express = require("express");

const {
  getAnnouncements,
  getAnnouncement,
  createAnnouncement,
  deleteAnnouncement,
  updateAnnouncement,
} = require("../controllers/announcementController");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.get("/", getAnnouncements);

router.get("/:id", getAnnouncement);

router.post("/", createAnnouncement);

router.delete("/:id", deleteAnnouncement);

router.patch("/:id", updateAnnouncement);

module.exports = router;
