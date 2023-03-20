const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    eventName: {
      type: String,
      required: true,
    },
    eventDateAndTime: {
      type: Date,
      required: true,
    },
    eventOrganizer: {
      type: String,
      required: true,
    },
    eventRemarks: {
      type: String,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("eventModel", eventSchema);
