const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    category: {type: String, required: true}, // beer, wine, cider, etc.
    brand: {type: String, required: true}, // Lech, Somersby
    flavour: {type: String, required: true}, // blueberry, lime-mint
    container: {type: String, required: true}, // can, bottle
    alcoholPercentage: {type: Number, required: true}, // 0, 4.5
    quantity: {type: Number},
    type: {type: String} // optional for wine: e.g. sweet, semi-dry, etc.
    // buyer: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true} - spiwiarnia 2.0
});

module.exports = mongoose.model('Item', itemSchema);