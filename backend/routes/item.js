const express = require('express');
const Item = require('../models/Item');

const router = express.Router();

// get all: GET /iems & filtering /items?category=beer
router.get('/', async (req, res) => {
    const { category } = req.query;
    let query = {};

    console.log('Parameters: ', req.query);

    if(category) {
        query.category = { $regex: new RegExp(category, 'i')};
    }

    try {
        const items = await Item.find(query);

        res.status(200).json({
            items
        });
    } catch (err) {
        console.error('🫢 Error while retrieving items:', err);
        res.status(500).json({
            message: '❌ Server error'
        });
    }
});

// get one: GET /items/:id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const item = await Item.findById(id);

        if(!item) {
            return res.status(404).json({
                message: '🫢 Item not found'
            });
        }

        res.status(200).json({
            item: item
        });
    } catch (err) {
        console.error('🫢 Error while retrieving item:', err);
        res.status(500).json({ message: '❌ Internal error' });
    }
});


// add new: POST /items
router.post('/', async (req, res) => {
    const { category, brand, flavour, container, alcoholPercentage, quantity } = req.body;

    if(!category || !brand || !flavour || !container || !alcoholPercentage || !quantity) {
        return res.status(400).json({
            message: '⛔ Fill all required fields!'
        });
    }

    try {
        const newItem = new Item({
            category,
            brand,
            flavour,
            container,
            alcoholPercentage,
            quantity
        });

        await newItem.save();

        res.status(200).json({
            message: '✅ new item has been added!',
            item: newItem
        });
    } catch (err) {
        console.error('🫢 Error while creating item:', err);
        res.status(500).json({
            message: '❌ Internal error'
        });
    }
});

// edit: PUT /items/:id
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const updatedItem = await Item.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true
        });

        if(!updatedItem) {
            res.status(404).json({
                message: '☹️ Item not found'
            });
        }

        res.json({
            updatedItem
        });

    } catch (err) {
        console.error('❌ Error while updating item:', err);
        res.status(500).json({ 
            message: '❌ Internal error' 
        });
    }
});

// delete: DELETE /items/:id
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedItem = await Item.findById(id);

        if(!deletedItem) {
            return res.status(404).json({
                message: '🫢 Item not found'
            });
        }

        await deletedItem.deleteOne();

        res.status(200).json({
            message: '✅ Item removed', 
            deletedItem: deletedItem 
        });
    } catch (err) {
        console.error('❌ Error while updating item:', err);
        res.status(500).json({ 
            message: '❌ Internal error' 
        });
    }
});

module.exports = router;