var mongoose = require('mongoose');

var suggestionSchema = new mongoose.Schema({
    
    question: String,
    questionAnswer: String,
    questionCategory: String,
    questionStatus : String,
    updated_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Suggestion', suggestionSchema);