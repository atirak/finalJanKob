const express = require('express');
const app = express();
const PersonRouter = express.Router();
const Person = require('../models/Person.model');
const User = require('../models/User.model')

PersonRouter.route('/').get(function (req, res) {
  Person.find(function (err, person){
      if(err){
        console.log(err);
      }
      else {
        res.render('managePerson', {person: person});

      }
    });
});
PersonRouter.route('/create').get(function (req, res) {
   res.render('createPerson');
 });
 PersonRouter.route('/post').post(function (req, res) {
   const person = new Person(req.body);
   person.save().then(person => {
    var datauser = {
      user: person.user,
      password: person.password,
      name: person.name,
      lastname: person.lastname,
      type:person.types
    }
    const user = new User(datauser)
    user.save().then(user => {
      console.log("sucess")
    })
      res.redirect('/managePerson');
     }).catch(err => {
     res.status(400).send("unable to save to database");
     });
 });
// -------------------------------------Edit--------------------------------------------------
PersonRouter.route('/edit/:id').get(function (req, res) {
   const id = req.params.id;
   Person.findById(id, function (err, person){
       res.render('editPerson', {person: person});
   });
 });
 //---------------------------------------Update-----------------------------------------------
 PersonRouter.route('/update/:id').post(function (req, res) {
   Person.findById(req.params.id, function(err, person) {
     if (!person)
       return next(new Error('Could not load Document'));
     else {
       // do your updates here
       person.id = req.body.id;
       person.name = req.body.name;
       person.lastname = req.body.lastname;
       person.type = req.body.type;
       person.user = req.body.user;
       person.password = req.body.password;
 
       person.save().then(person => {
           res.redirect('/managePerson');
       })
       .catch(err => {
             res.status(400).send("unable to update the database");
       });
     }
   });
 });
// ---------------------------------------------delete------------------------------------------
PersonRouter.route('/delete/:id').get(function (req, res) {
   Person.findByIdAndRemove({_id: req.params.id},function(err, person){
         if(err) res.json(err);
         else res.redirect('/managePerson');
     });
 });
module.exports = PersonRouter;