const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Food name is required'],
        trim: true
    },

    description: {
        type: String,
        required: [true, 'Food description is required'],
        trim: true
    },

    price: {
        type: Number,
        required: [true, 'Food price is required'],
        min: [0, 'Price cannot be negative']
    },

    category: {
        type: String,
        required: [true, 'Food category is required'],
        trim: true
    },

    image: {
        type: String,
        required: [true, 'Food image is required'],
        trim: true
    }
});

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;