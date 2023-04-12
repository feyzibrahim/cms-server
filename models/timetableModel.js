const mongoose = require("mongoose");

const { Schema } = mongoose;

const periodSchema = new Schema({
  periodNumber: {
    type: Number,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  teacherName: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
});

const timetableSchema = new Schema(
  {
    days: {
      monday: [periodSchema],
      tuesday: [periodSchema],
      wednesday: [periodSchema],
      thursday: [periodSchema],
      friday: [periodSchema],
    },
    breaks: [
      {
        startTime: {
          type: Date,
          required: true,
        },
        endTime: {
          type: Date,
          required: true,
        },
      },
    ],
    lunch: {
      startTime: {
        type: Date,
        required: true,
      },
      endTime: {
        type: Date,
        required: true,
      },
    },
    user_id: {
      type: String,
      required: true,
    },
    collegeId: {
      type: String,
      required: true,
    },
    departmentId: {
      type: String,
      required: true,
    },
    semester: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Timetable = mongoose.model("Timetable", timetableSchema);

module.exports = Timetable;
