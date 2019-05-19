const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://login:login1234@ds117866.mlab.com:17866/login');

const BuildRouter = require('./routes/BuildRouter');
const LoginRouter = require('./routes/LoginRouter');
const SubjectRouter = require('./routes/SubjectRouter');
const courseRouter = require('./routes/courseRouter');
const TeacherRouter = require('./routes/TeacherRouter');
const StudentRouter = require('./routes/StudentRouter');
const OfficialRouter = require('./routes/OfficialRouter');
const RoomRouter = require('./routes/RoomRouter');
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/manageBuild', BuildRouter);
app.use('/login', LoginRouter);
app.use('/manageSubject',SubjectRouter)
app.use('/manageCourse', courseRouter);
app.use('/manageTeacher',TeacherRouter);
app.use('/manageStudent',StudentRouter);
app.use('/manageOfficial',OfficialRouter);
app.use('/manageRoom',RoomRouter);
app.get('/', function (req, res) {
   res.sendFile(path.join(__dirname,'public', 'index.html'));
});

app.get('/login', (req, res) => {
  res.render('login');
 });
 app.get('/home', (req, res) => {
  res.render('home');
 });
 app.get('/manageSubject', (req, res) => {
  res.render('manageSubject');
 });
 app.get('/managePerson', (req, res) => {
  res.render('managePerson');
 });

 app.get('/manageTeacher', (req, res) => {
  res.render('manageTeacher');
 });
 app.get('/manageCourse', (req, res) => {
  res.render('manageCourse');
 });
 app.listen(port, function(){
  console.log('Node js Express js Tutorial at port', port);
});


