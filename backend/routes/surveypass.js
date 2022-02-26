const express = require('express');
const router = express.Router();

const surveypassCtrl = require('../controllers/surveypass');
const auth = require('../middleware/auth')

router.get('/',  surveypassCtrl.getAllSurveyPassUser);
router.post('/create', auth, surveypassCtrl.createSurveyPass);
router.get('/:id',  surveypassCtrl.getOneSurveyPassUser);
router.put('/modify:id', auth, surveypassCtrl.modifySurveyPass);
router.delete('/delete:id', auth, surveypassCtrl.deleteSurveyPass);

module.exports = router;