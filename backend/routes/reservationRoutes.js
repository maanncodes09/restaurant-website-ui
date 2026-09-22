const express = require('express');

const {
    createReservation,
    getReservations,
    getReservationById,
    updateReservation,
    updateReservationStatus,
    deleteReservation
} = require('../controllers/reservationController');

const protect = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');

const router = express.Router();

// Customer can create a reservation
router.post('/', createReservation);

// Admin-only routes
router.get('/', protect, admin, getReservations);
router.get('/:id', protect, admin, getReservationById);
router.put('/:id', protect, admin, updateReservation);
router.delete('/:id', protect, admin, deleteReservation);

router.put(
    '/:id/status',
    protect,
    admin,
    updateReservationStatus
);

module.exports = router;