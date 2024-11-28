const { json } = require('express')
const User = require('../models/userModel') // we use this to interact with our users collections in our database
const jwt = require('jsonwebtoken') // will be used to assign tokens to user to determine logged-in status


// This generates a token with the input id (which, in what follows, will be the same id MongoDB gives the associated element), 
// a secret string, and a time limit for the token (subsequently for continuous login)
const createToken = (_id) => {
    return token = jwt.sign({_id}, // payload
        process.env.SECRET, // secret key
         {expiresIn: '4h'}  // the token expires in 4 hours
        )
}


// Login user 
const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.login(email, password)

        // create a token assigned to user
        const token = createToken(user._id)

        res.status(200).json({email, token}) // if there is no error, User.login returns a user object
    } catch (error) {
        res.status(400).json({error: error.messgage, type: error.type})}
    
    
    // res.json({mssg: 'login user'}) // this was here when I just wanted to test API requests using Postman, before the logic implemented above
}

// Signup user 
const signupUser = async (req, res) => {
    const {email, password} = req.body

    try { // if theres is no error, User.signup returns a user object (created in mongoDB?)
        const user = await User.signup(email, password)
        // create a token assigned to user
        const token = createToken(user._id)
        
        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.messgage, type: error.type})
    }

    // res.json({mssg: 'signup user'}) // this was here when I just wanted to test API requests using Postman, before the logic implemented above
}

// This allows us to export the above functions for use
// in other files, particularly in the users.js routes file
module.exports = {signupUser, loginUser}