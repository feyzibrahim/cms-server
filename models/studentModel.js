const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const studentSchema = new Schema(
  {
    studentName: {
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
    department: {
      type: String,
      required: true,
    },
    mobileNumber: {
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
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("studentModel", studentSchema);
