var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const categorySchema = new mongoose.Schema({
    
    name: { type: String},
    description: String,
    updated_date: { type: Date, default: Date.now },

});

module.exports = mongoose.model('Category', categorySchema);