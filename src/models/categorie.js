const mongoose = require('mongoose');

const categorieSchema = mongoose.Schema({
    _id:false,
    name:{type:String,require:true},
    description:{type:String,require:false,default:""}
});
module.exports = mongoose.model('Categorie',categorieSchema);

