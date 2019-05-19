const express = require('express');
const app = express();
const homeRouter = express.Router();
const Emp = require('../models/personel.model');
homeRouter.route('/').get(function (req, res) {
  res.render('home');
});
module.exports = homeRouter;