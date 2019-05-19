const express = require('express');
const app = express();
const SubjectRouter = express.Router();
const Subject = require('../models/Subject.model');

SubjectRouter.route('/').get(function (req, res) {
  Subject.find(function (err, subject){
      if(err){
        console.log(err);
      }
      else {
        res.render('manageSubject', {subject: subject});
        // console.log(subject)
      }
    });
});
SubjectRouter.route('/create').get(function (req, res) {
   res.render('createSubject');
 });
 SubjectRouter.route('/post').post(function (req, res) {
   const subject = new Subject(req.body);
   console.log();
   subject.save().then(subject => {
     res.redirect('/manageSubject'); 
     }).catch(err => {
     res.status(400).send("unable to save to database");
     });
 });
// -------------------------------------Edit--------------------------------------------------
SubjectRouter.route('/edit/:id').get(function (req, res) {
   const id = req.params.id;
   Subject.findById(id, function (err, subject){
       res.render('editSubject', {subject: subject});
   });
 });
 //---------------------------------------Update-----------------------------------------------
 SubjectRouter.route('/update/:id').post(function (req, res) {
   Subject.findById(req.params.id, function(err, subject) {
     if (!subject)
       return next(new Error('Could not load Document'));
     else {
       // do your updates here
       subject.id = req.body.id;
       subject.namesubject = req.body.namesubject;
 
       subject.save().then(subject => {
           res.redirect('/manageSubject');
       })
       .catch(err => {
             res.status(400).send("unable to update the database");
       });
     }
   });
 });
// ---------------------------------------------delete------------------------------------------
SubjectRouter.route('/delete/:id').get(function (req, res) {
   Subject.findByIdAndRemove({_id: req.params.id},function(err, subject){
         if(err) res.json(err);
         else res.redirect('/manageSubject');
     });
 });
module.exports = SubjectRouter;