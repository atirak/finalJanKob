const express = require('express');
const app = express();
const TermRouter = express.Router();
const Term = require('../models/Term.model');

//------------------------Craete-----------------------------------------
TermRouter.route('/post').post(function (req, res) {
  const term = new Term(req.body);
  console.log(term);
  term.save()
    .then(term => {
      res.redirect('/Term');
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});
module.exports = TermRouter;