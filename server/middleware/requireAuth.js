const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers; //verify user is authenticated

  if (!authorization) {
    return res.status(401).json({error: 'Authorization token required'});
  }

  const token = authorization.split(' ')[1]; //extract the token from the Authorization header

  try {
    const { _id } = jwt.verify(token, process.env.SECRET); //verify the token and get the id from the payload
    req.user = await User.findOne({ _id }).select('_id');
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({error: 'Request is not authorized'});
  }
}

module.exports = requireAuth;