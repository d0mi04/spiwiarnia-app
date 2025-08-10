const express = require('express');
const Item = require('../models/Item');

const router = express.Router();

// get all: GET /iems & filtering /items?category=beer
router.get('/', async (req, res) => {
    const query = {};

    console.log('Parameters: ', req.query);

    // filter on any field:
    const allowedFields = ['category', 'brand', 'flavour', 'container', 'alcoholPercentage', 'quantity', 'type'];

    for(const field of allowedFields) {
        const value = req.query[field];

        if(value) {
            // array of fields
            if(Array.isArray(value)) {
                query[field] = {
                    $in: value.map(v => new RegExp(v, 'i'))
                };
            } else {
                query[field] = {
                    $regex: new RegExp(value, 'i')
                };
            }
        }
    }

    // sorting and ordering
    const sortBy = req.query.sortBy || 'category'; // default: sort by name
    const order = req.query.order === 'desc' ? -1 : 1; // default: sort ascending
    const sortOptions = {};
    sortOptions[sortBy] = order;

    // pagination:
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        const items = await Item.find(query)
            .sort(sortOptions)
            .skip(skip)
            .limit(limit);

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

    if(!category || !brand || !flavour || !container || alcoholPercentage === null || !quantity) {
        return res.status(400).json({
            message: '⛔ Fill all required fields!'
        });
    }

    try {
        // checking if this product already exists:
        const existingItem = await Item.findOne({
            category: new RegExp(`^${category}$`, 'i'), 
            brand: new RegExp(`^${brand}$`, 'i'),
            flavour: new RegExp(`^${flavour}$`, 'i'),
            container: new RegExp(`^${container}$`, 'i'),
            alcoholPercentage: Number(alcoholPercentage)
        });

        if(existingItem) {
            existingItem.quantity += quantity;
            await existingItem.save();

            return res.status(200).json({
                message: '✅ Quantity updated!',
                item: existingItem
            });
        }

        // if product does not exists - create new one:
        const newItem = new Item({
            category,
            brand,
            flavour,
            container,
            alcoholPercentage,
            quantity
        });

        await newItem.save();

        res.status(201).json({
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