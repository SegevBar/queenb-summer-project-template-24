const express = require('express')

// controller functions
const {signupUser, loginUser} = require('../controllers/userController')


const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

// test
router.post('/test', (req,res) => {
    res.send('Hello from users route, post')
})

module.exports = router

