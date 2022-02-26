const express = require('express');
const router = express.Router();

const surveycorrectCtrl = require('../controllers/surveycorrect');
const auth = require('../middleware/auth')

router.get('/',  surveycorrectCtrl.getAllSurveyCorrected);
router.post('/create', auth, surveycorrectCtrl.createSurveyCorrect);
router.get('/:id',  surveycorrectCtrl.getOneSurveyCorrected);
router.put('/modify:id', auth, surveycorrectCtrl.modifySurveyCorrect);
router.delete('/delete:id', auth, surveycorrectCtrl.deleteSurveyCorrect);

module.exports = router;