const express = require('express');
const app = express();
const TermRouter = express.Router();
const Term = require('../models/Term.model');

TermRouter.route("/get").get(function(req, res){
  Term.find((err, data) => {
      if (err) return err;
      res.send(data)
      console.log(data)
  })
})
TermRouter.route('/post').post(function(req, res){
  var data = {
    year : req.body.year,
    term : req.body.term
  }
  console.log(data)
  var condi = {
      _id: "5ce241b6530b57276e7cdb53"
  }
  Term.update(condi,{ $set: data},(err, data) => {
      if (err) {
          console.log(err)
      } else {
        res.render('Term');
      }
  })
})

module.exports = TermRouter;