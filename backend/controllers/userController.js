const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

//@desc Registers Users
//@route /users/register
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const { email, password, username, isAdmin, age, subscriptions, interests } =
    req.body;

  if (!(email || password || username || age)) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  const userExist = await User.findOne({ email });
  const uniqueUsername = await User.findOne({ username });
  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }
  if (uniqueUsername) {
    res.status(400);
    throw new Error("Username Taken");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create User
  const user = await User.create({
    username,
    email,
    isAdmin,
    age,
    subscriptions,
    interests,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.username,
      email: user.email,
      age: user.age,
      isAdmin: user.isAdmin,
      subscriptions: subscriptions,
      interests: interests,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

//@desc Login User
//@route /users/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  if (!(email || username || password)) {
    res.status(400);
    throw new Error("Please fill all fields.");
  }

  const user = await User.findOne({ email });

  //Checking if user Exists or Not
  if (!user) {
    res.status(400);
    throw new Error("The user doesnt exists");
  }

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      age: user.age,
      interests: user.interests,
      subscriptions: user.subscriptions,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials.");
  }
});

//@desc Get Me
//@route /users/me
//@access Private
const getMe = asyncHandler(async (req, res) => {
  const { _id, email, age, username } = await User.findById(req.body._id);

  res.status(200).json({
    id: _id,
    username: username,
    email: email,
    age: age,
  });
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
