const mongoose = require('mongoose');
var date = new Date;
const userSchema = mongoose.Schema({
    _id:false,
    name: { type: String, require: true },
    address: { type: String, require: false, default: "" },
    phone: { type: String, require: false, default: "" },
    email:
    {
        type: String,
        require: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, require: true },
});

module.exports = mongoose.model('User', userSchema);