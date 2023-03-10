const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const meetingSchema = new Schema(
  {
    meeting_name: {
      type: String,
      required: true,
    },
    organized_by: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    timestamps: {
      type: Date,
      required: true,
    },
    isOver: {
      type: Boolean,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("meetingModel", meetingSchema);
