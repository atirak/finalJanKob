const express = require('express');
const app = express();
const courseRouter = express.Router();
const Course = require('../models/Course.model');
const Teacher = require('../models/Teacher.model');
const Subject = require('../models/Subject.model');
const Group = require('../models/Group.model');


courseRouter.route('/').get(function (req, res) {
   Course.find(function (err, course){
      if(err){
        console.log(err);
      }
      else {
        res.render('manageCourse', {course: course});
      }
    });
});

//---------------- create -------------
courseRouter.route('/create').get(function (req, res) {
  Teacher.find().then(teacher =>{
    console.log(teacher)
    Subject.find(function(err,subject){
        console.log(subject)
        Group.find(function(err,group){ 
          console.log(group)
      res.render('createCourse',{teacher:teacher,subject:subject,group:group});
      });
    });
  });
 });
//--------------------------------------------------------
 courseRouter.route('/post').post(function (req, res) {
   const course = new Course(req.body);
   console.log(course);
   course.save()
     .then(course => {
     res.redirect('/manageCourse'); 
     })
     .catch(err => {
     res.status(400).send("unable to save to database");
     });
 });
// -------------------------------------Edit--------------------------------------------------
courseRouter.route('/edit/:id').get(function (req, res) {
   const id = req.params.id;
   Course.findById(id, function (err, course){
       res.render('editCourse', {course: course});
   });
 });

 //---------------------------------------Update-----------------------------------------------
 courseRouter.route('/update/:id').post(function (req, res) {
   Course.findById(req.params.id, function(err, course) {
     if (!course)
       return next(new Error('Could not load Document'));
     else {
       // do your updates here
       
       course.codeSub = req.body.codeSub;
       course.nameSub = req.body.nameSub;
       course.nameTeach = req.body.nameTeach;
       course.group = req.body.group;
       course.student = req.body.student;
 
       course.save().then(course => {
           res.redirect('/manageCourse');
       })
       .catch(err => {
             res.status(400).send("unable to update the database");
       });
     }
   });
 });
// ---------------------------------------------delete------------------------------------------
courseRouter.route('/delete/:id').get(function (req, res) {
   Course.findByIdAndRemove({_id: req.params.id},
        function(err, course){
         if(err) res.json(err);
         else res.redirect('/manageCourse');
     });
 });

 courseRouter.route('/addExam/:id').get(function (req, res) {
  const id = req.params.id;
  Course.findById(id, function (err, course){
      res.render('editCourse', {course: course});
  });
});

module.exports = courseRouter;