const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const collegeSchema = new Schema(
  {
    college_name: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    teachers_count: {
      type: Number,
      required: true,
    },
    students_count: {
      type: Number,
      required: true,
    },
    staff_count: {
      type: Number,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("collegeModel", collegeSchema);
