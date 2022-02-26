const SurveyCorrect = require('../models/SurveyCorrect');

exports.createSurveyCorrect = (req, res, next) => {

  

  const surveycorrect = new SurveyCorrect({
    surveypassId: req.body.surveypassId,
    note: req.body.note,
    updated_date: req.body.updated_date,
  });

  
  surveycorrect.save().then(
    () => {
      res.status(201).json({
        id : surveycorrect._id,
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.getOneSurveyCorrect = (req, res, next) => {

  SurveyCorrect.findOne({
    _id: req.params.id
  })
  .then(
    (surveycorrect) => {
      res.status(200).json(surveycorrect);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  )

};

exports.getAllSurveyCorrected = (req, res, next) => {
  SurveyCorrect.find({}, {}, function (err, docs) {
      res.status(200).send(docs);
    }).populate('surveypassId')
    }
exports.getOneSurveyCorrected =  (req, res, next) => {
  SurveyCorrect.find({_id: req.params.id}, {}, function (err, docs) {

    if (docs == 0) {
      res.status(403).send('Le code que vous avez saisie ne fonctionne pas')
    } else {
      res.status(200).send(docs)
    }
    
  }).populate('surveypassId')
}

exports.modifySurveyCorrect = (req, res, next) => {

  const surveycorrect = new SurveyCorrect({
    _id: req.params.id,
    surveypassId: req.body.surveypassId,
    note: req.body.note,
    updated_date: req.body.updated_date
  });
  SurveyCorrect.updateOne({_id: req.params.id}, surveycorrect).then(
    () => {
      res.status(201).json({
        message: 'Survey correct updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.deleteSurveyCorrect = (req, res, next) => {
  SurveyCorrect.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.getAllSurveyCorrect = (req, res, next) => {
    SurveyCorrect.find()
      .then(surveycorrects => res.status(200).json(surveycorrects))
      .catch(error => res.status(400).json({ error }));
};