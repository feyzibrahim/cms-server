const express = require("express");

const {
  loginUser,
  signupUser,
  updateUser,
} = require("../controllers/userController");

const router = express.Router();

router.post("/login", loginUser);

router.post("/signup", signupUser);

router.patch("/update/:id", updateUser);

module.exports = router;
