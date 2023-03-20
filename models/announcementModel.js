const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const announcementSchema = new Schema(
  {
    announcementTitle: {
      type: String,
      required: true,
    },
    announcementDiscription: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("announcementModel", announcementSchema);
