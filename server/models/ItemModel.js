const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        //type: String,
        type: Buffer, // Store the image as binary data (Buffer)
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: [
            'Jackets & Coats', 
            'Dresses', 
            'Jumpers', 
            'Tops', 
            'Jumpsuits', 
            'ActiveWear', 
            'Accessories', 
            'Bags', 
            'Trousers', 
            'Jeans', 
            'Skirts', 
            'Shoes'
        ]
    },
    gender: {
        type: String,
        required: true,
        enum: ['Women', 'Men']
    },
    condition: {
        type: String,
        required: true,
        enum: ['Brand New', 'Like New', 'Used - Excellent', 'Used - Good', 'Used - Fair'] 
    },
    price: {
        type: Number,
        required: true
    },
    size: {
        type: String,
        required: true,
        enum: ['XS','S', 'M', 'L', 'XL', 'XXL', 'Details in Description']
    },
    description: {
        type: String,
        //required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Item', itemSchema);