const Reservation = require('../models/Reservation');

// Create a new reservation
const createReservation = async (req, res, next) => {
    try {
        const {
            name,
            email,
            phone,
            date,
            time,
            guests,
            specialRequest
        } = req.body;

        // Check required fields
        if (!name || !email || !phone || !date || !time || !guests) {
            return res.status(400).json({
                message: 'Please provide all required reservation details'
            });
        }

        // Validate reservation date
        const reservationDate = new Date(date);

        if (isNaN(reservationDate.getTime())) {
            return res.status(400).json({
                message: 'Invalid reservation date'
            });
        }

        // Reservation cannot be in the past
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        reservationDate.setHours(0, 0, 0, 0);

        if (reservationDate < today) {
            return res.status(400).json({
                message: 'Reservation date cannot be in the past'
            });
        }

        // Validate time format
        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

        if (!timeRegex.test(time)) {
            return res.status(400).json({
                message: 'Invalid time format. Use HH:MM'
            });
        }
        // Validate email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
    return res.status(400).json({
        message: 'Please provide a valid email address'
    });
}

// Validate phone number
const phoneRegex = /^[0-9]{10}$/;

if (!phoneRegex.test(phone)) {
    return res.status(400).json({
        message: 'Please provide a valid 10-digit phone number'
    });
}

        // Validate number of guests
        if (guests < 1 || guests > 20) {
            return res.status(400).json({
                message: 'Number of guests must be between 1 and 20'
            });
        }

        // Check if the selected date and time are already reserved
        const existingReservation = await Reservation.findOne({
            date: reservationDate,
            time: time,
            status: {
                $ne: 'cancelled'
            }
        });

        if (existingReservation) {
            return res.status(409).json({
                message: 'This time slot is already reserved. Please choose another time.'
            });
        }

        // Create reservation
        const reservation = await Reservation.create({
            name,
            email,
            phone,
            date: reservationDate,
            time,
            guests,
            specialRequest
        });

        res.status(201).json({
            message: 'Reservation created successfully',
            reservation
        });

    } catch (error) {
        next(error);
    }
};

// Get all reservations
const getReservations = async (req, res, next) => {
    try {
        const reservations = await Reservation.find();

        res.status(200).json({
            message: 'Reservations fetched successfully',
            reservations
        });

    } catch (error) {
        next(error);
    }
};


// Get a single reservation by ID
const getReservationById = async (req, res, next) => {
    try {
        const reservation = await Reservation.findById(req.params.id);

        if (!reservation) {
            return res.status(404).json({
                message: 'Reservation not found'
            });
        }

        res.status(200).json({
            message: 'Reservation fetched successfully',
            reservation
        });

    } catch (error) {
        next(error);
    }
};


// Update a reservation
const updateReservation = async (req, res, next) => {
    try {
        const reservation = await Reservation.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!reservation) {
            return res.status(404).json({
                message: 'Reservation not found'
            });
        }

        res.status(200).json({
            message: 'Reservation updated successfully',
            reservation
        });

    } catch (error) {
        next(error);
    }
};
// Update reservation status
const updateReservationStatus = async (req, res, next) => {
    try {
        const { status } = req.body;

        // Validate status
        const allowedStatuses = ['pending', 'confirmed', 'cancelled'];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: 'Invalid reservation status'
            });
        }

        const reservation = await Reservation.findByIdAndUpdate(
            req.params.id,
            { status },
            {
                new: true,
                runValidators: true
            }
        );

        if (!reservation) {
            return res.status(404).json({
                message: 'Reservation not found'
            });
        }

        res.status(200).json({
            message: 'Reservation status updated successfully',
            reservation
        });

    } catch (error) {
        next(error);
    }
};


// Delete a reservation
const deleteReservation = async (req, res, next) => {
    try {
        const reservation = await Reservation.findByIdAndDelete(req.params.id);

        if (!reservation) {
            return res.status(404).json({
                message: 'Reservation not found'
            });
        }

        res.status(200).json({
            message: 'Reservation deleted successfully',
            reservation
        });

    } catch (error) {
        next(error);
    }
};


module.exports = {
    createReservation,
    getReservations,
    getReservationById,
    updateReservation,
    updateReservationStatus,
    deleteReservation
};