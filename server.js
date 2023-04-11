require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");
const collegeRoutes = require("./routes/college");
const departmentRoutes = require("./routes/departments");
const meetingRoutes = require("./routes/meeting");
const teacherRoutes = require("./routes/teacher");
const eventRoutes = require("./routes/events");
const announcementRoutes = require("./routes/announcements");
const managementRoutes = require("./routes/management");
const staffRoutes = require("./routes/staff");
const studentRoutes = require("./routes/student");
const timetableRoutes = require("./routes/timetable");
const attendanceRoutes = require("./routes/attendance");
const semesterRoutes = require("./routes/semester");
const subjectRoutes = require("./routes/subjects");
const assignmentRoutes = require("./routes/assignments");

const cors = require("cors");

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

const app = express();

mongoose.set("strictQuery", false);

app.use(express.json());

app.use(cors(corsOptions));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/workouts", workoutRoutes);

app.use("/api/user", userRoutes);

app.use("/api/college", collegeRoutes);

app.use("/api/department", departmentRoutes);

app.use("/api/meetings", meetingRoutes);

app.use("/api/teacher", teacherRoutes);

app.use("/api/event", eventRoutes);

app.use("/api/announcement", announcementRoutes);

app.use("/api/management", managementRoutes);

app.use("/api/staff", staffRoutes);

app.use("/api/student", studentRoutes);

app.use("/api/timetable", timetableRoutes);

app.use("/api/attendance", attendanceRoutes);

app.use("/api/semester", semesterRoutes);

app.use("/api/subject", subjectRoutes);

app.use("/api/assignments", assignmentRoutes);

// connect to db

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Connected to db on the web");
    });
  })
  .catch((error) => {
    console.log(error);
  });
