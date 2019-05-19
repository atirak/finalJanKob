const express = require('express');
const app = express();
const CoinRouter = express.Router();
const Coin = require('../models/Coin.model');

CoinRouter.route('/').get(function (req, res) {
   Coin.find(function (err, build){
      if(err){
        console.log(err);
      }
      else {
        res.render('index', {build: build});
        // console.log(build)
      }
    });
});
CoinRouter.route('/create').get(function (req, res) {
   res.render('create');
 });
 CoinRouter.route('/post').post(function (req, res) {
   const coin = new Coin(req.body);
   console.log(coin);
   coin.save()
     .then(coin => {
     res.redirect('/build'); 
     })
     .catch(err => {
     res.status(400).send("unable to save to database");
     });
 });
// -------------------------------------Edit--------------------------------------------------
CoinRouter.route('/edit/:id').get(function (req, res) {
   const id = req.params.id;
   Coin.findById(id, function (err, coin){
       res.render('edit', {coin: coin});
   });
 });
 //---------------------------------------Update-----------------------------------------------
 CoinRouter.route('/update/:id').post(function (req, res) {
   Coin.findById(req.params.id, function(err, coin) {
     if (!coin)
       return next(new Error('Could not load Document'));
     else {
       // do your updates here
       coin.name = req.body.name;
       coin.namefull = req.body.namefull;
 
       coin.save().then(coin => {
           res.redirect('/build');
       })
       .catch(err => {
             res.status(400).send("unable to update the database");
       });
     }
   });
 });
// ---------------------------------------------delete------------------------------------------
 CoinRouter.route('/delete/:id').get(function (req, res) {
   Coin.findByIdAndRemove({_id: req.params.id},
        function(err, coin){
         if(err) res.json(err);
         else res.redirect('/build');
     });
 });
module.exports = CoinRouter;