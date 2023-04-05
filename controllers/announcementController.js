const Announcement = require("../models/announcementModel");
const mongoose = require("mongoose");

// Get All Announcement

const getAnnouncements = async (req, res) => {
  const queryFromMob = req.query.q;
  if (queryFromMob === undefined) {
    const user_id = req.user._id;

    const announcements = await Announcement.find({ user_id });
    res.status(200).json(announcements);
  } else {
    const query = req.query.q;
    console.log(query);
    const announcements = await Announcement.find({
      user_id: { $regex: query },
    });
    res.status(200).json(announcements);
  }
};

// Get Single Announcement

const getAnnouncement = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ error: "Id is not valid please check again" });
  }

  const announcement = await Announcement.findById(id);

  if (!announcement) {
    return res.status(404).json({ error: "No such announcement" });
  }

  res.status(200).json(announcement);
};

// Create new Announcement

const createAnnouncement = async (req, res) => {
  const { announcementTitle, announcementDiscription } = req.body;

  // add doc to db
  try {
    const user_id = req.user._id;
    const announcement = await Announcement.create({
      announcementTitle,
      announcementDiscription,
      user_id,
    });
    res.status(200).json(announcement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Announcement

const deleteAnnouncement = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ error: "Id is not valid please check again" });
  }

  const announcement = await Announcement.findOneAndDelete({ _id: id });

  if (!announcement) {
    return res.status(400).json({ error: "No such Announcement" });
  }

  res.status(200).json(announcement);
};

// Update Announcement

const updateAnnouncement = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ error: "Id is not valid Please check again" });
  }

  const announcement = await Announcement.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
    { new: true }
  );

  if (!announcement) {
    return res.status(400).json({ error: "No such Announcement" });
  }

  res.status(200).json(announcement);
};

// Exporting

module.exports = {
  getAnnouncements,
  getAnnouncement,
  createAnnouncement,
  deleteAnnouncement,
  updateAnnouncement,
};
