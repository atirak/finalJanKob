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
    user.id = teacher._id
    user.user =  teacher.user
    user.pass = teacher.password
    user.name = teacher.firstname
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

// -------------------------------------Edit--------------------------------------------------
TeacherRouter.route('/edit/:id').get(function (req, res) {
  const id = req.params.id;
  Teacher.findById(id, function (err, Teacher) {
      res.render('editTeacher', { teacher: Teacher });
  });
});
//---------------------------------------Update-----------------------------------------------
TeacherRouter.route('/update/:id').post(function (req, res) {
  Teacher.findById(req.params.id, function (err, teacher) {
      if (!teacher)
          return next(new Error('Could not load Document'));
      else {
          // do your updates here
          teacher.id = req.body.user;
          teacher.firstname = req.body.firstname,
          teacher.lastname = req.body.lastname,
          teacher.faculty = req.body.faculty,
          teacher.major = req.body.major
        
          teacher.password = bcryp.hashSync(teacher.password,5);
          
         
          teacher.save().then(Teacher => {
            
            
            res.redirect('/manageTeacher');
          }).catch(err => {
            res.status(400).send("unable to save to database");
          });
      }
  });
});
// ---------------------------------------------delete------------------------------------------
TeacherRouter.route('/delete/:id').get(function (req, res) {
  Teacher.findByIdAndRemove({ _id: req.params.id },
      function (err, Teacher) {
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
module.exports = TeacherRouter;