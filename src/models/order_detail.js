const mongoose = require('mongoose');

const orderDetailSchema = mongoose.Schema({
    _id: false,
    priceUnit: { type: Number ,default:0},
    amount: { type: Number ,default:0},
    idOrder: { type: Number, ref: 'orders', require: true },
    idProduct: { type: Number, ref: 'products', require: true },

});

module.exports = mongoose.model('OrderDetail', orderDetailSchema);