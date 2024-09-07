const User = require('../models/UserModel')
const jwt = require('jsonwebtoken')

//create token for authentication
const authenticateToken = (_id) => {
   return jwt.sign({_id: _id}, process.env.SECRET , {expiresIn: '5d'})

}

//login 
const loginProcess = async (req, res) => {
    res.json({mssg: 'login successfully'})
}
//signup
const signupProcess = async (req, res) => {
    const {email,password} = req.body
    try{
        const newUser = await User.signup(email, password)
         //token
        const token = authenticateToken(newUser._id)
        res.status(200).json({email, token})

    }
    catch(error){
        res.status(400).json({error: error.message})

    }
}

module.exports = {
    loginProcess,
    signupProcess,
}