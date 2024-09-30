const User = require('../models/UserModel')
const jwt = require('jsonwebtoken');

const createToken = (id) => {
  return jwt.sign({ _id: id }, process.env.SECRET, { expiresIn: '3d' });
}

//login user
const loginUser = async (req, res) => {
    console.log('login user');
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password); 
        const token = createToken(user._id); //create a token
        res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//signup user
const signupUser = async (req, res) => {
   console.log('signup user');
    const { email, password, firstName, surname } = req.body;

    try {
        const user = await User.signup(email, password, firstName, surname); //create new user
        const token = createToken(user._id); //create a token
        res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { loginUser, signupUser }