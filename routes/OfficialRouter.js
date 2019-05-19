const express = require('express');
const bcryp = require('bcrypt')
const OfficialRouter = express.Router();
const Official = require('../models/Official.model');
const User = require('../models/User.model')

// ---------------- get to table -----------------
OfficialRouter.route('/').get(function (req, res) {
  Official.find(function (err, official) {
    if (err) {
      console.log(err);
    }
    else {
      res.render('manageOfficial', { official: official });

    }
  });
});

// --------------------insert--------------------
OfficialRouter.route('/create').get(function (req, res) {
  res.render('createOfficial');
});
OfficialRouter.route('/post').post(function (req, res) {
  var official = new Official();
  official.id = req.body.user;
  official.user = req.body.user,
    official.password = req.body.password,
    official.firstname = req.body.firstname,
    official.lastname = req.body.lastname,
    official.status = req.body.status,


    official.password = bcryp.hashSync(official.password, 5);
  official.save().then(official => {
    var user = new User();
    user.user = official.user
    user.pass = official.password
    user.name = official.firstname
    user.lastname = official.lastname
    user.type = "official"
    user.pass = official.password
    console.log(user)
    user.save()
    res.redirect('/manageOfficial');
  }).catch(err => {
    res.status(400).send("unable to save to database");
  });
});

// ----------------------delete---------------------

OfficialRouter.route('/delete/:id').get(function (req, res) {
  Official.findByIdAndRemove({ _id: req.params.id }, function (err, official) {
    if (err) res.json(err);
    else res.redirect('/manageOfficial');
  });
});

// ------------------ edit ----------------
OfficialRouter.route('/edit/:id').get(function (req, res) {
  const id = req.params.id;
  Official.findById(id, function (err, official) {
    res.render('editOfficial', { official: official });
  });
});
//---------------------------------------Update-----------------------------------------------
OfficialRouter.route('/update/:id').post(function (req, res) {
  Official.findById(req.params.id, function (err, official) {
    if (!official)
      return next(new Error('Could not load Document'));
    else {
      // do your updates here
      official.firstname = req.body.firstname;
      official.lastname = req.body.lastname;
      official.status = req.body.status;

      official.save().then(official => {
        res.redirect('/manageOfficial');
      })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});
module.exports = OfficialRouter;