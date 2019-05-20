const express = require('express');
const app = express();
const courseRouter = express.Router();
const Course = require('../models/Course.model');
const Teacher = require('../models/Teacher.model');
const Subject = require('../models/Subject.model');
const Group = require('../models/Group.model');
const Room = require('../models/Room.model');
const User = require('../models/User.model');
const Exam = require('../models/Exam.model');


courseRouter.route('/').get(function (req, res) {
  Course.find(function (err, course) {
    if (err) {
      console.log(err);
    }
    else {
      res.render('manageCourse', { course: course });
    }
  });
});

//---------------- create -------------
courseRouter.route('/create').get(function (req, res) {
  Teacher.find().then(teacher => {
    console.log(teacher)
    Subject.find(function (err, subject) {
      console.log(subject)

      res.render('createCourse', { teacher: teacher, subject: subject });

    });
  });
});
//--------------------------------------------------------------------------------------------
courseRouter.route('/post').post(function (req, res) {
  var str = req.body.teacherName;
  var array = str.split(",");

  const course = new Course({
    subjectID: req.body.subjectID,
    subjectName: req.body.subjectName,
    teacherName: array
  });

  course.save().then(course => {
    var objectId = course._id;
    for (i = 1; i <= req.body.group; i++) {
      const group = new Group({
        groupID: i,
        courseID: objectId,
        student: [],
        amount: req.body.student
      });
      group.save()
    }
    res.redirect('/manageCourse');
  })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });




});
// -------------------------------------Edit--------------------------------------------------
courseRouter.route('/edit/:id').get(function (req, res) {
  const id = req.params.id;
  Course.findById(id, function (err, course) {
    Teacher.find().then(teacher => {
      res.render('editCourse', { course: course, teacher: teacher });
    });
  });
});

//---------------------------------------Update-----------------------------------------------
courseRouter.route('/update/:id').post(function (req, res) {
  Course.findById(req.params.id, function (err, course) {
    if (!course)
      return next(new Error('Could not load Document'));
    else {
      // do your updates here
      // course.codeSub = req.body.codeSub;
      // course.nameSub = req.body.nameSub;
      // course.nameTeach = req.body.nameTeach;
      // course.group = req.body.group;
      // course.student = req.body.student;

      // course.save().then(course => {
      //   res.redirect('/manageCourse');
      // })
      //   .catch(err => {
      //     res.status(400).send("unable to update the database");
      //   });

      var str = req.body.teacherName;
      var array = str.split(",");
      course.teacherName = []
      course.teacherName = array


      course.save().then(course => {
        var objectId = course._id;

        Group.deleteMany({ courseID: objectId }, function (err, group) {
          
        });

        for (i = 1; i <= req.body.group; i++) {
          const group = new Group({
            groupID: i,
            courseID: objectId,
            student: [],
            amount: req.body.student
          });
          group.save()
        }
        res.redirect('/manageCourse');
      })
        .catch(err => {
          res.status(400).send("unable to save to database");
        });




    }
  });
});
// ---------------------------------------------delete------------------------------------------
courseRouter.route('/delete/:id').get(function (req, res) {
  Course.findByIdAndRemove({ _id: req.params.id },
    function (err, course) {
      if (err) res.json(err);
      else res.redirect('/manageCourse');
    });
});


courseId = ""
courseName = ""
courseRouter.route('/addExam/:id').get(function (req, res) {
  const id = req.params.id;
  courseId = id
  Course.findById(id, function (err, course) {
    Room.find(function (err, room) {
      Group.find({ courseID: courseId }, function (err, group) {
        User.find(function (err, user) {
          courseName = course.subjectName
          res.render('createExam', { course: course, room: room, user: user, group: group });
        });
      });
    });
  });
});

courseRouter.route('/saveExam').post(function (req, res) {
  const exam = new Exam(req.body);
  exam.courseID = courseId;
  exam.subjectName = courseName;
  var time = req.body.datetime;
  var tarray = time.split("T");
  exam.date = tarray[0];
  exam.timeStart = tarray[1];
  var tarray2 = tarray[1].split(":");
  exam.timeStop = (Number(tarray2[0]) + Number(req.body.lengthTime)) + ":" + tarray2[1];
  exam.room = req.body.room;
  var str = req.body.examiner;
  var array = str.split(",");
  exam.examiner = array;
  exam.group = req.body.group;
  exam.save()
    .then(course => {
      res.redirect('/manageExam');
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

module.exports = courseRouter;