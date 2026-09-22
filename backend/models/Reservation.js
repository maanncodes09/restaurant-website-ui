const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true
    },

    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true
    },

    date: {
        type: Date,
        required: [true, 'Reservation date is required']
    },

    time: {
        type: String,
        required: [true, 'Reservation time is required']
    },

    guests: {
        type: Number,
        required: [true, 'Number of guests is required'],
        min: [1, 'At least 1 guest is required']
    },

    specialRequest: {
        type: String,
        trim: true,
        default: ''
    },

    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    }
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;