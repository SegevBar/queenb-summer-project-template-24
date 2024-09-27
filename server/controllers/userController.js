const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');


// Sign-in controller function
const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'User does not exist' });
    }

    // Compare the entered password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Generate a JWT for the authenticated user
    const authToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Respond with the authToken
    res.json({ authToken });
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Signup controller function
const signUp = async (req, res) => {
  const { email, password, name, phone_number, city, country } = req.body;
  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash the password before saving the user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      user_id: uuidv4(), 
      name,
      email,
      password: hashedPassword,
      phone_number,
      address: {
        city,
        country,
      },
    });

    await newUser.save();

    // Generate a JWT for the new user
    const authToken = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Respond with the authToken
    res.status(201).json({ authToken });
  } catch (error) {

    res.status(500).send('Server error');
  }
};

module.exports = {
  signIn,
  signUp,
};
