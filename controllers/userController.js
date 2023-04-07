const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    const name = user.name;
    const userType = user.userType;
    const collegeId = user.collegeId;
    const dataAccessId = user.dataAccessId;

    res
      .status(200)
      .json({ name, email, token, userType, collegeId, dataAccessId });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const signupUser = async (req, res) => {
  const { name, email, password, userType, collegeId, dataAccessId } = req.body;

  try {
    const user = await User.signup(
      name,
      email,
      password,
      userType,
      collegeId,
      dataAccessId
    );

    //create a token
    const token = createToken(user._id);

    res
      .status(200)
      .json({ name, email, token, userType, collegeId, dataAccessId });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ error: "Id is not valid Please check again" });
  }

  try {
    const user = await User.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    );

    if (!user) {
      return res.status(400).json({ error: "User Not Found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, signupUser, updateUser };
