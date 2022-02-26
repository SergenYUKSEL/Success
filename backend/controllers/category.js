const Category = require('../models/Category');

exports.createCategory = (req, res, next) => {
  console.log(req.body)
  const category = new Category({
    name: req.body.name,
    description: req.body.description,
    updated_date: req.body.updated_date,
  });
  category.save().then(
    () => {
      res.status(201).json({
        id: category._id
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

exports.getOneCategory = (req, res, next) => {
  Category.findOne({
    _id: req.params.id
  }).then(
    (category) => {
      res.status(200).json(category);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifyCategory = (req, res, next) => {
  const category = new Category({
    _id: req.params.id,
    name: req.body.name,
    description: req.body.description,
    updated_date: req.body.updated_date
  });
  Category.updateOne({_id: req.params.id}, category).then(
    () => {
      res.status(201).json({
        message: 'Category updated successfully!'
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

exports.deleteCategory = (req, res, next) => {
  Category.deleteOne({_id: req.params.id}).then(
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

exports.getAllCategory = (req, res, next) => {
    Category.find()
      .then(categorys => res.status(200).json(categorys))
      .catch(error => res.status(400).json({ error }));
};