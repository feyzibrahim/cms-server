const Meetings = require("../models/meetingsModel");
const mongoose = require("mongoose");

// Get All Meetings

const getMeetings = async (req, res) => {
  const user_id = req.user._id;

  const meetings = await Meetings.find({ user_id });
  res.status(200).json(meetings);
};

// Get Single Meetings

const getMeeting = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ error: "Id is not valid please check again" });
  }

  const meeting = await Meetings.findById(id);

  if (!meeting) {
    return res.status(404).json({ error: "No such Meeting" });
  }

  res.status(200).json(meeting);
};

// Create new Meeting

const createMeeting = async (req, res) => {
  const { meeting_name, organized_by, location, timestamps, isOver } = req.body;

  // add doc to db
  try {
    const user_id = req.user._id;
    const meeting = await Meetings.create({
      meeting_name,
      organized_by,
      location,
      timestamps,
      isOver,
      user_id,
    });
    res.status(200).json(meeting);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Meeting

const deleteMeeting = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ error: "Id is not valid please check again" });
  }

  const meeting = await Meetings.findOneAndDelete({ _id: id });

  if (!meeting) {
    return res.status(400).json({ error: "No such Meeting" });
  }

  res.status(200).json(meeting);
};

// Update Meeting

const updateMeeting = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ error: "Id is not valid Please check again" });
  }

  const meeting = await Meetings.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
    { new: true }
  );

  if (!meeting) {
    return res.status(400).json({ error: "No such Meeting" });
  }

  res.status(200).json(meeting);
};

// Exporting

module.exports = {
  getMeetings,
  getMeeting,
  createMeeting,
  deleteMeeting,
  updateMeeting,
};
