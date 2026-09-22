const express = require('express');

const {
    addMenuItem,
    getMenuItems,
    getMenuItemById,
    updateMenuItem,
    deleteMenuItem
} = require('../controllers/menuController');

const protect = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');

const router = express.Router();

// Public routes
router.get('/', getMenuItems);
router.get('/:id', getMenuItemById);

// Admin-only routes
router.post('/', protect, admin, addMenuItem);
router.put('/:id', protect, admin, updateMenuItem);
router.delete('/:id', protect, admin, deleteMenuItem);

module.exports = router;