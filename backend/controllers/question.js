const Question = require('../models/Question');

exports.createQuestion = (req, res, next) => {
  const question = new Question({
    questionName: req.body.questionName,
    questionContent: req.body.questionContent,
    questionCategory: req.body.questionCategory,
    questionPoint: req.body.questionPoint,
    questionAnswer: req.body.questionAnswer,
    updated_date: req.body.updated_date,
    
  });
  question.save().then(
    () => {
      res.status(201).json({
        id : question._id
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

exports.getOneQuestion = (req, res, next) => {
  
  Question.findOne({
    _id: req.params.id
  })
  .then(
    (question) => {
      res.status(200).json(question);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
  
  
};

exports.modifyQuestion = (req, res, next) => {
  const question = new Question({
    _id: req.params.id,
    questionName: req.body.questionName,
    questionContent: req.body.questionContent,
    questionCategory: req.body.questionCategory,
    questionPoint: req.body.questionPoint,
    questionAnswer: req.body.questionAnswer,
    updated_date: req.body.updated_date
  });
  Question.updateOne({_id: req.params.id}, question).then(
    () => {
      res.status(201).json({
        message: 'Question updated successfully!'
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

exports.deleteQuestion = (req, res, next) => {
  Question.deleteOne({_id: req.params.id}).then(
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

exports.getAllQuestion = (req, res, next) => {
  Question.find()
  .then(questions => res.status(200).json(questions))
  .catch(error => res.status(400).json({ error }));
};