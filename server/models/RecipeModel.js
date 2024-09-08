const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    categories: [{
        type: String,
        required: true
    }],
    imageUrl: {
        type: String,
        required: true
    },
    ingredients: [{
        ingredient: {
            type: String,
            required: true
        },
        quantity: {
            type: String,
            required: true
        }
    }],
    totalTime: {
        //In minutes
        type: Number,
        required: true
    },
    instructions: [{
        type: String,
        required: true
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        //required: true
        //Maybe not required when the admin creates the recipe
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Recipe', recipeSchema);