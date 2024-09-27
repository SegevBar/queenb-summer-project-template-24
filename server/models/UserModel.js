const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    address: {
        street: {
            type: String,
        },
        city: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        }
    },
    animals: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Animal'
    }],
    adoption_requests: [{
        animal: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Animal'
        },
        request_status: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            default: 'pending'
        }
    }]
}, {
    timestamps: true
});

// Static method for signup
UserSchema.statics.signup = async function (name, email, password, phone_number, city, country) {
    // Validate required fields
    if (!name || !email || !password || !phone_number || !city || !country) {
        throw Error('All fields must be filled');
    }

    // Validate email
    if (!validator.isEmail(email)) {
        throw Error('Invalid email');
    }

    // Validate password strength
    if (!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough');
    }

    // Check if email is already in use
    const exists = await this.findOne({ email });
    if (exists) {
        throw Error('Email already exists');
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user
    const user = await this.create({
        name,
        email,
        password: hashedPassword,
        phone_number,
        address: {
            city,
            country
        }
    });

    return user;
};

// Static method for login
UserSchema.statics.login = async function (email, password) {
    // Validate fields
    if (!email || !password) {
        throw Error('All fields must be filled');
    }

    // Find the user by email
    const user = await this.findOne({ email });
    if (!user) {
        throw Error('Incorrect email');
    }

    // Compare passwords
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw Error('Incorrect password');
    }

    return user;
};


module.exports = mongoose.model('User', UserSchema);
