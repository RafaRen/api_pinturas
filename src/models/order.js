const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({

    _id: false,
    total: { type: Number, require: false,default:0 },
    state: { type: Number, require: false, default: 0 },
    idUser: { type: Number, ref: 'users', require: true },

});

module.exports = mongoose.model('order', orderSchema);
