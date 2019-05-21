const express = require('express');
const app = express();
const homeRouter = express.Router();
userid=""
homeRouter.route('/').get(function (req, res) {
  res.render('home');
});
homeRouter.route('/ajan').get(function (req, res) {
  res.render('homeTeacher');
});
homeRouter.route('/nisit').get(function (req, res) {
  res.render('homeStudent');
});
module.exports = homeRouter;