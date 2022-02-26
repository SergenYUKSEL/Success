var mongoose = require('mongoose');
const Schema = mongoose.Schema;
var surveyPassSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    userId: [ {type: Schema.Types.ObjectId, ref: 'User' } ],
    surveyId: [ {type: Schema.Types.ObjectId, ref: 'Survey' } ],
    reponse: Array,
    updated_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('SurveyPass', surveyPassSchema);