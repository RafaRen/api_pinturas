const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    _id: false,
    idUser: { type: Number, res: 'users', require: true }
    idProduct: { type: Number, res: 'products', require: true }

});

module.exports = mongoose.model('cart', cartSchema);