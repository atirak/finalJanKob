const express = require('express');
const bcryp = require('bcrypt')
const TeacherRouter = express.Router();
const Teacher = require('../models/Teacher.model');
const User = require('../models/User.model')

// ---------------- get to table -----------------
TeacherRouter.route('/').get(function (req, res) {
  Teacher.find(function (err, teacher) {
    if (err) {
      console.log(err);
    }
    else {
      res.render('manageTeacher', { teacher: teacher });

    }
  });
});

// --------------------insert--------------------
TeacherRouter.route('/create').get(function (req, res) {
  res.render('createTeacher');
});
TeacherRouter.route('/post').post(function (req, res) {
  var teacher = new Teacher();
  teacher.id = req.body.user;
  teacher.user = req.body.user,
  teacher.password = req.body.password,
  teacher.firstname = req.body.firstname,
  teacher.lastname = req.body.lastname,
  teacher.faculty = req.body.faculty,
  teacher.major = req.body.major

  teacher.password = bcryp.hashSync(teacher.password,5);
  teacher.save().then(teacher => {
    var user = new User();
    user.user =  teacher.user
    user.pass = teacher.password
    user.firstname = teacher.firstname
    user.lastname = teacher.lastname
    user.type = "teacher"
    user.pass = teacher.password
    console.log(user)
    
    user.save()
    res.redirect('/manageTeacher');
  }).catch(err => {
    res.status(400).send("unable to save to database");
  });
});
module.exports = TeacherRouter;