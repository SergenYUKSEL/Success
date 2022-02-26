const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const User = require('../models/User');

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash,
      lastname: req.body.lastname,
      firstname: req.body.firstname,
      group: req.body.group,
      role: req.body.role,
    });
    user.save()
    .then(() => res.status(201).json({ userId: user._id,}))
    .catch(error => res.status(400).json({ error}));
  })
  .catch(error => res.status(500).json({ error}));
};

exports.login = (req, res, next) => {
  User.findOne({ email : req.body.email })
        .then(user => {
            //if user not exist than return status 400
            if (!user) return res.status(400).json({ msg: "User not exist" })

            //if user exist than compare password
            //password comes from the user
            //user.password comes from the database
            bcrypt.compare(req.body.password, user.password, (err, data) => {
                //if error than throw error
                if (err) console.log(err)

                //if both match than you can do anything
                if (data == true) {
                    
          // return the information including token as JSON
               //   res.json({success: true, token: 'JWT ' + token});
                    return res.status(200).json({ msg: "Login success",
                    userId: user.id,
                    userRole: user.role,
                    token: jwt.sign({ userId: user._id},
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '24h' })
                   });
                } else {
                    return res.status(401).json({ msg: "Invalid credencial" })
                }
                

            })

        })

};
exports.modifyUser = (req, res, next) => {
  
  const user = new User({
    _id: req.params.id,
    password: req.body.password,
    email: req.body.email,
    lastname: req.body.lastname,
    firstname: req.body.firstname,
    group: req.body.group,
    role: req.body.role,
    updated_date: req.body.updated_date
  });
  User.updateOne({_id: req.params.id}, user).then(
    () => {
      res.status(201).json({
        message: 'User updated successfully!'
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
exports.getOneUser = (req, res, next) => {
  User.findOne({
    _id: req.params.id
  }).then(
    (user) => {
      res.status(200).json(user);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};
exports.getAllUserGroup = (req, res, next) => {
  User.find({}, {}, function (err, docs) {
      res.status(200).send(docs);
    }).populate('group')
    }
exports.getOneUserGroup =  (req, res, next) => {
  User.find({_id: req.params.id}, {}, function (err, docs) {

    if (docs == 0) {
      res.status(403).send('Le code que vous avez saisie ne fonctionne pas')
    } else {
      res.status(200).send(docs)
    }
    
  }).populate('group')
}

exports.deleteUser = (req, res, next) => {
  User.deleteOne({_id: req.params.id}).then(
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

exports.getAllUser = (req, res, next) => {
  User.find()
    .then(users => res.status(200).json(users))
    .catch(error => res.status(400).json({ error }));
};