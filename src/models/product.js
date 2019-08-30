const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: false,
    name: { type: String, require: true },
    price: { type: Number, require: true },
    description: { type: String, require: false },
    image: { type: String, require: false },
    state: { type: Number, require: false },
    idCategory: { type: Number, res: 'categories', require: true }
});

module.exports = mongoose.model('product', productSchema);