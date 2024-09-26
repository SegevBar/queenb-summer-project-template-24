const User = require("../models/UserModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// get a single user
const getSingleUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ mssg: "error getting user" });
  }
  try {
    const user = await User.findById(id);
    res.status(200).json({ user });
  } catch (err) {
    res.status(400).json({ mssg: "error getting user", err });
  }
};

// create a new user
const createUser = async (req, res) => {
  const { userName, email, password, profilePicUrl } = req.body;
  const salt = await bcrypt.genSalt(); //for password encryption
  try {
    const user_exists = await User.findOne({ email });
    if (!user_exists) {
      const user = await User.create({
        userName,
        email,
        password: await bcrypt.hash(password, salt),
        profilePicUrl,
      });
      res.status(200).json({ user });
    } else {
      res.status(400).json({ mssg: "user already exists", err });
    }
  } catch (err) {
    res.status(400).json({ mssg: "error creating user", err });
  }
};

// sign in with email and password
const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }); //find user by email
    if (user == null) {
      // user was not found
      res.status(400).json({ mssg: "error finding user", err });
    }

    if (await bcrypt.compare(password, user.password)) {
      // check if the password matches
      res
        .status(200)
        .json({ userName: user.userName, profilePic: user.profilePicUrl });
    } else {
      res.status(400).json({ mssg: "invalid password" });
    }
  } catch (err) {
    res.status(400).json({ mssg: "error logging in", err });
  }
};

/* update a user
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, color, squeaks } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { name, color, squeaks },
      { new: true }
    );
    res.status(200).json({ user });
  } catch (err) {
    res.status(400).json({ mssg: "error updating user", err });
  }
};*/

module.exports = {
  createUser,
  getSingleUser,
  signIn,
};
