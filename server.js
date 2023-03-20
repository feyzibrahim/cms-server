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

const app = express();

mongoose.set("strictQuery", false);

app.use(express.json());

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
