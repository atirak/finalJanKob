const express = require('express');
const bcrypt = require('bcrypt')
const LoginRouter = express.Router();
const User = require('../models/User.model');
LoginRouter.post("/", (req, res) => {
  var user = {
      user: req.body.user
  }
  var pass = req.body.pass
  User.find(user,function(err,data){
    if(bcrypt.compareSync(pass,data[0].pass)){
      res.render('home')
    }else{
      res.redirect('login')
    }
  })
});
module.exports = LoginRouter;