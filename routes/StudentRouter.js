const express = require('express');
const bcryp = require('bcrypt')
const StudentRouter = express.Router();
const Student = require('../models/Student.model');
const User = require('../models/User.model')

// ---------------- get to table -----------------
StudentRouter.route('/').get(function (req, res) {
  Student.find(function (err, student) {
    if (err) {
      console.log(err);
    }
    else {
      res.render('manageStudent', { student: student });

    }
  });
});

// --------------------insert--------------------
StudentRouter.route('/create').get(function (req, res) {
  res.render('createStudent');
});
StudentRouter.route('/post').post(function (req, res) {
  var student = new Student();
  student.id = req.body.user;
  student.user = req.body.user,
    student.password = req.body.password,
    student.firstname = req.body.firstname,
    student.lastname = req.body.lastname,
    student.tier = req.body.tier,
    student.faculty = req.body.faculty,
    student.major = req.body.major

  student.password = bcryp.hashSync(student.password, 5);
  student.save().then(student => {
    var user = new User();
    user.id = student._id
    user.user = student.user
    user.pass = student.password
    user.name = student.firstname
    user.lastname = student.lastname
    user.type = "student"
    user.pass = student.password
    console.log(user)
    user.save()
    res.redirect('/manageStudent');
  }).catch(err => {
    res.status(400).send("unable to save to database");
  });
});

// ----------------------delete---------------------

StudentRouter.route('/delete/:id').get(function (req, res) {
  Student.findByIdAndRemove({ _id: req.params.id }, function (err, student) {
    if (err) res.json(err);
    else
    User.deleteOne({id:req.params.id},
      function (err,user){
        if (err) res.json(err);
        else
        res.redirect('/manageTeacher');
      });
  });
});

// ------------------ edit ----------------
StudentRouter.route('/edit/:id').get(function (req, res) {
  const id = req.params.id;
  Student.findById(id, function (err, student) {
    res.render('editStudent', { student: student });
  });
});
//---------------------------------------Update-----------------------------------------------
StudentRouter.route('/update/:id').post(function (req, res) {
  Student.findById(req.params.id, function (err, student) {
    if (!student)
      return next(new Error('Could not load Document'));
    else {
      // do your updates here
      student.firstname = req.body.firstname;
      student.lastname = req.body.lastname;
      student.tier = req.body.tier;
      student.faculty = req.body.faculty;
      student.major = req.body.major;

      student.save().then(student => {
        res.redirect('/manageStudent');
      })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});
module.exports = StudentRouter;