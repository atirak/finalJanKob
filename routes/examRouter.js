const express = require('express');
const app = express();
const examRouter = express.Router();
const Course = require('../models/Course.model');
const Teacher = require('../models/Teacher.model');
const Subject = require('../models/Subject.model');
const Group = require('../models/Group.model');
const Room = require('../models/Room.model');
const User = require('../models/User.model');
const Exam = require('../models/Exam.model');


examRouter.route('/').get(function (req, res) {
  Exam.find(function (err, Exam){
      if(err){
        console.log(err);
      }
      else {
        res.render('manageExam', {exam: Exam});
      }
    });
});

examRouter.route('/ajan').get(function (req, res) {
  Exam.find(function (err, Exam){
      if(err){
        console.log(err);
      }
      else {
        res.render('ajanExam', {exam: Exam});
      }
    });
});
examRouter.route('/nisit').get(function (req, res) {
  Exam.find(function (err, Exam){
      if(err){
        console.log(err);
      }
      else {
        res.render('nisitExam', {exam: Exam});
      }
    });
});

//---------------- create -------------
examRouter.route('/create').get(function (req, res) {
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
//--------------------------------------------------------------------------------------------
examRouter.route('/post').post(function (req, res) {
   const course = new Course(req.body);
   console.log(course);
   var str = req.body.teacherName;
   var array = str.split(",");
   course.teacherName = array;
   course.save()
     .then(course => {
     res.redirect('/manageCourse'); 
     })
     .catch(err => {
     res.status(400).send("unable to save to database");
     });
 });
 
// -------------------------------------Edit--------------------------------------------------
examRouter.route('/edit/:id').get(function (req, res) {
   const id = req.params.id;
   
   Exam.findById(id, function (err, Exam){
    User.find(function (err, user){
      Room.find(function(err,room){
       res.render('editExam', {exam: Exam,user: user,room: room});
      }); 
    
   });
  });
 });

 //---------------------------------------Update-----------------------------------------------
 examRouter.route('/update/:id').post(function (req, res) {
  Exam.findById(req.params.id, function(err, Exam) {
     if (!Exam)
       return next(new Error('Could not load Document'));
     else {
       // do your updates here
       var time = req.body.datetime;
       var tarray = time.split("T");
       Exam.date = tarray[0];
       Exam.timeStart = tarray[1];
       var tarray2 = tarray[1].split(":");
       Exam.timeStop = (Number(tarray2[0])+Number(req.body.lengthTime))+":"+tarray2[1];
       Exam.room = req.body.room;
       var str = req.body.examiner;
       var array = str.split(",");
       Exam.examiner = [];
       Exam.examiner = array;
       Exam.save().then(course => {
           res.redirect('/manageExam');
       })
       .catch(err => {
             res.status(400).send("unable to update the database");
       });
     }
   });
 });
// ---------------------------------------------delete------------------------------------------
examRouter.route('/delete/:id').get(function (req, res) {
  Exam.findByIdAndRemove({_id: req.params.id},
        function(err, exam){
         if(err) res.json(err);
         else res.redirect('/manageExam');
     });
 });


module.exports = examRouter;