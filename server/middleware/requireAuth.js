const jwt = require('jsonwebtoken')
const User = require('../models/userModel')


// This function gets the authorization headers, checks that the request is valid,
// raises an error if not. If it is valid, we get the user's token and verify it. 
// If the token is verified, we use the id to find the user in the database. If it exists, the 
// next function is called - the user is authenticated. Otherwise, we log an error and send 
// an error back to the client. 
const requireAuth = async (req, res, next) => {

    // verify authentication

    const {authorization} = req.headers 

    // check that we have a value for req.headers
    if (!authorization) {
        return res.status(401).json({error: 'Authorization token required'})
    }

    // the authorization array looks like "Word string". We want the second one (position 1), 
    // the string that comes after the gap, that's the token
    const token = authorization.split(' ')[1]

    // verify the token, make sure it's not been tampered with
    // particularly, if it is verified, we have the id available to us
    try {
        const {_id} = jwt.verify(token, process.env.SECRET)
        // use the id from the payload, to find the user in the database
        req.user = await User.findOne({_id}).select('_id') // 'select' is useful because instead 
        // of returning all the information (email, salted&hashed password, id, etc), it returns a smaller 
        // document, with just the id property on it (we don't need the rest here)
        next() // fire the next handler function
    } catch(error) {
        console.log(error)
        res.status(401).json({error: 'Request is not authorized'})
    }
}

module.exports = requireAuth