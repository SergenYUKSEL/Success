var mongoose = require('mongoose');
const Schema = mongoose.Schema;
var surveyCorrectSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    surveypassId: [ {type: Schema.Types.ObjectId, ref: 'SurveyPass' } ],
    note: Number,
    updated_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('SurveyCorrect', surveyCorrectSchema);