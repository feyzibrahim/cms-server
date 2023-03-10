const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const departmentSchema = new Schema(
  {
    department_name: {
      type: String,
      required: true,
    },
    year_count: {
      type: Number,
      required: true,
    },
    hod: {
      type: String,
      required: true,
    },
    teacher_count: {
      type: Number,
    },
    students_count: {
      type: String,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("departmentModel", departmentSchema);
