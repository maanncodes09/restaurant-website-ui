const Menu = require('../models/Menu');

// Add a new food item
const addMenuItem = async (req, res, next) => {
    try {
        const menuItem = await Menu.create(req.body);

        res.status(201).json({
            message: 'Food item added successfully',
            menuItem
        });

    } catch (error) {
        next(error);
    }
};


// Get all food items
const getMenuItems = async (req, res, next) => {
    try {
        const menuItems = await Menu.find();

        res.status(200).json({
            message: 'Menu items fetched successfully',
            menuItems
        });

    } catch (error) {
        next(error);
    }
};


// Get a single food item by ID
const getMenuItemById = async (req, res, next) => {
    try {
        const menuItem = await Menu.findById(req.params.id);

        if (!menuItem) {
            return res.status(404).json({
                message: 'Food item not found'
            });
        }

        res.status(200).json({
            message: 'Menu item fetched successfully',
            menuItem
        });

    } catch (error) {
        next(error);
    }
};


// Update a food item
const updateMenuItem = async (req, res, next) => {
    try {
        const menuItem = await Menu.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!menuItem) {
            return res.status(404).json({
                message: 'Food item not found'
            });
        }

        res.status(200).json({
            message: 'Food item updated successfully',
            menuItem
        });

    } catch (error) {
        next(error);
    }
};


// Delete a food item
const deleteMenuItem = async (req, res, next) => {
    try {
        const menuItem = await Menu.findByIdAndDelete(req.params.id);

        if (!menuItem) {
            return res.status(404).json({
                message: 'Food item not found'
            });
        }

        res.status(200).json({
            message: 'Food item deleted successfully',
            menuItem
        });

    } catch (error) {
        next(error);
    }
};


module.exports = {
    addMenuItem,
    getMenuItems,
    getMenuItemById,
    updateMenuItem,
    deleteMenuItem
};