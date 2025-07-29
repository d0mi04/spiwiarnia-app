const mongoose = require('mongoose');

const itemSchema = new mongoose.Schem({
    name: {type: String, required: true, unique: true},
    category: {type: String}, //beer, juice, snack, sweets, etc.
    quantity: {type: Number},
    // one more field in future: buyer - who bought this item
});

module.exports = mongoose.model('Item', itemSchema);