const express = require('express');
const bcrypt = require('bcrypt')
const LoginRouter = express.Router();
const User = require('../models/User.model');
const Student = require('../models/Student.model');
const Teacher = require('../models/Teacher.model');
const Official = require('../models/Official.model');
LoginRouter.post("/", (req, res) => {
  User.find({ user: req.body.user }, function (err, data) {
    if (err) return err;
    if (data.length > 0) {
      if (bcrypt.compareSync(req.body.pass, data[0].pass)) {
        if (data[0].type == 'student') {
          res.render('homeStudent',{'data':JSON.stringify(data)})
        } else if (data[0].type == 'teacher') {
          res.render('homeTeacher',{'data':JSON.stringify(data)})
        } else if (data[0].type == 'official') {
          res.render('home',{'data':JSON.stringify(data)})
        }

      } else {
        res.redirect('login')
      }
    }
    
  })
});
module.exports = LoginRouter;