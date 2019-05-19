const express = require('express');
const app = express();
const BuildRouter = express.Router();
const Build = require('../models/Build.model');

BuildRouter.route('/').get(function (req, res) {
  Build.find(function (err, build) {
    if (err) {
      console.log(err);
    }
    else {
      res.render('manageBuild', { build: build });
    }
  });
});
//------------------------Craete-----------------------------------------
BuildRouter.route('/create').get(function (req, res) {
  res.render('createBuild');
});
BuildRouter.route('/post').post(function (req, res) {
  const build = new Build(req.body);
  console.log(build);
  build.save()
    .then(build => {
      res.redirect('/manageBuild');
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});
// -------------------------------------Edit--------------------------------------------------
BuildRouter.route('/edit/:id').get(function (req, res) {
  const id = req.params.id;
  Build.findById(id, function (err, build) {
    res.render('editBuild', { build: build });
  });
});
//---------------------------------------Update-----------------------------------------------
BuildRouter.route('/update/:id').post(function (req, res) {
  Build.findById(req.params.id, function (err, build) {
    if (!build)
      return next(new Error('Could not load Document'));
    else {
      // do your updates here
     build.name = req.body.name;
      build.namefull = req.body.namefull;

      build.save().then(build => {
        res.redirect('/manageBuild');
      })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});
// ---------------------------------------------delete------------------------------------------
BuildRouter.route('/delete/:id').get(function (req, res) {
  Build.findByIdAndRemove({ _id: req.params.id },
    function (err, build) {
      if (err) res.json(err);
      else res.redirect('/manageBuild');
    });
});
module.exports = BuildRouter;