const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

//static login method
userSchema.statics.login = async function(email, password) {
  if (!email || !password) {
    throw Error('All fields are required');
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error('Incorrect email');
  }
  
  const match = await bcrypt.compare(password, user.password); //compare the hashed password with the input password
  if(!match) {
    throw Error('Incorrect password');
  }

  return user; //return the user if login is successful
}

//static signup method
userSchema.statics.signup = async function(email, password, firstName, surname) {
  //validation
  if (!email || !password || !firstName || !surname) {
    throw Error('All fields are required');
  }
  if (!validator.isEmail(email)) {
    throw Error('Invalid email address');
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character');
  }

  const exists = await this.findOne({ email }); //check if already exists
  
  if (exists) {
    throw Error('Email already in use');
  }
  
  const salt = await bcrypt.genSalt(10); //add a random string to the password
  const hash = await bcrypt.hash(password, salt); //hash the password

  const user = await this.create({ email, password: hash, firstName, surname }); //create a new user in the database
  
  return user;
}

module.exports = mongoose.model('User', userSchema);