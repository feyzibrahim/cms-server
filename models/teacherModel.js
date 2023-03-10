const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const teacherSchema = new Schema(
  {
    teacherName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    registrationNumber: {
      type: String,
    },
    gender: {
      type: String,
    },
    designation: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    facultyMobileNumber: {
      type: Number,
    },
    dob: {
      type: Date,
      required: true,
    },
    joiningDate: {
      type: Date,
      required: true,
    },
    subjectsCanTeach: {
      type: String,
    },
    salary: {
      type: Number,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("teacherModel", teacherSchema);
