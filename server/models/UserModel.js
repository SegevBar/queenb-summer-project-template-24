const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  firstName: {
      type: String,
      required: true,
      trim: true
  },
  lastName: {
      type: String,
      required: true,
      trim: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function(password) {
        // Password must be at least 6 characters long, contain at least one lowercase letter, and no spaces
        const passwordRegex = /^(?=.*[a-z])[^\s]{6,}$/;
        return passwordRegex.test(password);
      },
      message: 'Password must be at least 6 characters long, contain at least one lowercase letter, and cannot contain spaces'
    }
  },
  saved: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe'
  }],
  created: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe'
  }]
}, {
  timestamps: true
});

// static signup method
userSchema.statics.signup = async function(firstName, lastName, username, email, password) {

  // validation
  if (!email || !password || !firstName || !lastName || !username) {
    throw Error('All fields must be filled')
  }
  if (!validator.isEmail(email)) {
    throw Error('Email not valid')
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough')
  }

  const emailExists = await this.findOne({ email });
  const usernameExists = await this.findOne({ username });

  if (emailExists) {
    throw Error('Email already in use')
  }

  if (usernameExists) {
    throw Error('Username already in use')
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    firstName,
    lastName,
    username,
    email,
    password: hash
  });

  return user;
}

// static login method
userSchema.statics.login = async function(email, password) {

  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ email })
  if (!user) {
    throw Error('Incorrect email')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect password')
  }

  return user
}

module.exports = mongoose.model('User', userSchema);
