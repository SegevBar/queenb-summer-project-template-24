const mongoose = require('mongoose') // database - MongoDB
const bcrypt = require('bcrypt') // will be used to hash passwords (to not save them as is in the database) 
const validator = require('validator') // will be used to verify that the user input for email,password is valid

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true, // makes sure that no one can create an account without an email address 
        unique: true // makes sure that no one can create more than one account assigned to the same email address 
    },
    password: {
        type: String,
        required: true 
        // doesn't have to be unique - different users can have the same password
    }
})

////NEED TO SHOW ERRORS IN A CLEAR WAY, BUT THIS WORKS! (at least for signup)


// Define a static signup method on the schema
userSchema.statics.signup = async function(email, password){

    // Validation of input

    // makes sure that the inputs are not empty
    if (!email || !password){
        throw Error('All fields must be filled.') 
    }

    // 'isEmail' from the package 'validator' returns 'True' if the input is a valid email address
    // We throw an error message if the email is not valid
    if (!validator.isEmail(email)){ 
        throw Error('Email is not valid. Please insert a valid email address.') 
    }

    // 'isStrongPassword' from the package 'validator' returns 'True' if the password is strong enough
    // We throw an error message if the chosen password is not strong enough (based on criteria chosed by the developers of this function/package)
    if (!validator.isStrongPassword(password)){ 
        throw Error('Password not strong enough. Please choose a stronger password.')
    }

    // 'findOne({email})' checks if the email already exists in the database
    // If it's already in the database, we throw an error
    const exists = await this.findOne({ email }) 
    if (exists) { 
        throw Error('An account with this email address aleady exists. Please sign up with a different email address, or log in.')
    }


    // First layers of protection - salt & hashing passwords

    // creates salt, adding another layer of protection (makes it harder for hackers to do password-matching)
    // the larger the number inside genSalt (here it's 10), the greater the protection, but also the runtime
    const salt = await bcrypt.genSalt(10) 

    // hashes the password the user created (to avoid saving passwords as-is in the database)
    const hash = await bcrypt.hash(password, salt) 


    // Creates a 'user' element, containing the following data: email, hashed password
    const user = await this.create({ email, password:hash })

    return user
}



// Define a static login method on the schema
 userSchema.statics.login = async function(email, password){
    // makes sure that the inputs are not empty
    if (!email || !password){
        throw Error('All fields must be filled.') 
    }

    // 'findOne({email})' checks if the email exists in the database
    // If it's not in the database, we throw an error 
    const user = await this.findOne({ email }) 
    if (!user) { 
        throw Error('Incorrect email. Please make sure you typed it correctly, or sign-up.')
    }

    // 'bcrypt.compare' compares the plain-text password with the hashed one from the database; returns 'True' if they match.
    // If they don't match, we throw an error 
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error('Incorrect password.')
    }

    return user
 }








module.exports = mongoose.model('User', userSchema)
// now mongoose won't allow us to save users to the database, unless they adhere to the Schema defined above
