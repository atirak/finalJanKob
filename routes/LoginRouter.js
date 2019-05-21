const express = require('express');
const bcrypt = require('bcrypt')
const LoginRouter = express.Router();
const User = require('../models/User.model');
const Student = require('../models/Student.model');
const Teacher = require('../models/Teacher.model');
const Official = require('../models/Official.model');

LoginRouter.route('/').get(function (req, res) {
  res.render('login', {ไม่ผ่าน:''});
});
LoginRouter.route('/').get(function (req, res) {
  res.render('home', {data:''});
});
LoginRouter.route('/').get(function (req, res) {
  res.render('homeStudent', {data:''});
});
LoginRouter.route('/').get(function (req, res) {
  res.render('homeTeacher', {data:''});
});
userid=""
LoginRouter.post("/", (req, res) => {
  User.find({ user: req.body.user }, function (err, data) {
    if (err) return err;
    if (data.length > 0) {
      if (bcrypt.compareSync(req.body.pass, data[0].pass)) {
        if (data[0].type == 'student') {
          userid=data[0]._id
          res.render('homeStudent',{data:data,'data':JSON.stringify(data)})
        } else if (data[0].type == 'teacher') {
          userid=data[0]._id
          res.render('homeTeacher',{data:data,'data':JSON.stringify(data)})
        } else if (data[0].type == 'official') {
          userid=data[0]._id
          res.render('home',{ data: data ,'data': JSON.stringify(data)})
          console.log(data);
        }
      } else {
        res.render('login',{ไม่ผ่าน:'พาสผิด'});
        console.log('ไม่ผ่าน')
      }
    }else{
      res.render('login',{ไม่ผ่าน:'ไอดีผิด'});
        console.log('ไม่ผ่าน')
    }
  })
});
module.exports = LoginRouter;