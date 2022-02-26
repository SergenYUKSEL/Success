const SurveyPass = require('../models/SurveyPass');

exports.createSurveyPass = (req, res, next) => {

  

  const surveypass = new SurveyPass({
    userId: req.body.userId,
    surveyId: req.body.surveyId,
    reponse: req.body.reponse,
    updated_date: req.body.updated_date,
  });

  
  surveypass.save().then(
    () => {
      res.status(201).json({
        id : surveypass._id,
        reponse: surveypass.reponse,
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

exports.getOneSurveyPass = (req, res, next) => {

  SurveyPass.findOne({
    _id: req.params.id
  })
  .then(
    (surveypass) => {
      res.status(200).json(surveypass);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  )

};

exports.getAllSurveyPassUser = (req, res, next) => {
  SurveyPass.find({}, {}, function (err, docs) {
      res.status(200).send(docs);
    }).populate('userId')
    .populate('surveyId')
    }
exports.getOneSurveyPassUser =  (req, res, next) => {
  SurveyPass.find({_id: req.params.id}, {}, function (err, docs) {

    if (docs == 0) {
      res.status(403).send('Le code que vous avez saisie ne fonctionne pas')
    } else {
      res.status(200).send(docs)
    }
    
  }).populate('userId')
  .populate('surveyId')
}

exports.modifySurveyPass = (req, res, next) => {
 // let responses = []

 // for (let i = 0; i < req.body.response.length; i++) {

    //responses.push(JSON.parse(req.body.response[i]))
  //}
  const surveypass = new SurveyPass({
    _id: req.params.id,
    userId: req.body.userId,
    surveyId: req.body.surveyId,
    reponse: req.body.reponse,
    updated_date: req.body.updated_date
  });
  SurveyPass.updateOne({_id: req.params.id}, surveypass).then(
    () => {
      res.status(201).json({
        message: 'Survey Pass updated successfully!'
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

exports.deleteSurveyPass = (req, res, next) => {
  SurveyPass.deleteOne({_id: req.params.id}).then(
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

exports.getAllSurveyPass = (req, res, next) => {
    SurveyPass.find()
      .then(surveypasses => res.status(200).json(surveypasses))
      .catch(error => res.status(400).json({ error }));
};