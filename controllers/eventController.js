const Event = require("../models/eventModel");
const mongoose = require("mongoose");

// Get All Event

const getEvents = async (req, res) => {
  const user_id = req.user._id;

  const events = await Event.find({ user_id });
  res.status(200).json(events);
};

// Get Single Event

const getEvent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ error: "Id is not valid please check again" });
  }

  const events = await Event.findById(id);

  if (!events) {
    return res.status(404).json({ error: "No such events" });
  }

  res.status(200).json(events);
};

// Create new Event

const createEvent = async (req, res) => {
  const { eventName, eventDateAndTime, eventOrganizer, eventRemarks } =
    req.body;

  // add doc to db
  try {
    const user_id = req.user._id;
    const event = await Event.create({
      eventName,
      eventDateAndTime,
      eventOrganizer,
      eventRemarks,
      user_id,
    });
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Event

const deleteEvent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ error: "Id is not valid please check again" });
  }

  const event = await Event.findOneAndDelete({ _id: id });

  if (!event) {
    return res.status(400).json({ error: "No such Event" });
  }

  res.status(200).json(event);
};

// Update Event

const updateEvent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ error: "Id is not valid Please check again" });
  }

  const event = await Event.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
    { new: true }
  );

  if (!event) {
    return res.status(400).json({ error: "No such Event" });
  }

  res.status(200).json(event);
};

// Exporting

module.exports = {
  getEvents,
  getEvent,
  createEvent,
  deleteEvent,
  updateEvent,
};
