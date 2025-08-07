const express = require('express');
const Item = require('../models/Item');

const router = express.Router();

// get all: GET /iems & filtering /items?category=beer
router.get('/', async (req, res) => {
    try {
        const { category } = req.query;
        let query = {};

        console.log('Parameters: ', req.query);

        if(category) {
            query.category = { $regex: new RegExp(category, 'i')};
        }

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
    try {
        const { id } = req.params;
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
    const { name, category, quantity } = req.body;

    if(!name || !category || !quantity) {
        return res.status(400).json({
            message: '⛔ Fill all required fields!'
        });
    }

    try {
        const newItem = new Item({
            name,
            category,
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
            message: '❌ Server error'
        });
    }
})

// delete: DELETE /items/:id


module.exports = router;