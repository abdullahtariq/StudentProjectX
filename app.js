var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var studentController = require('./routes/students/student.controller')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// connecting to database
var connectionString = 'mongodb://admin:admin123@ds041536.mlab.com:41536/studentproject'

try{
  // mysql_connect('localhost',usernmae,password)
  mongoose.connect(connectionString,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },function(err,db){
    console.log('connection to db is successfull')
  })
  mongoose.connection.on('error',function(error){
    console.log('Mongodb connection is not established')
    console.log(error);
    process.exit(-1);
  })
}catch(error){
  console.log('error in mongoose',error);
}

// Business Logic (Models,Controllers & Views)
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Routes for API calling
app.get('/students',studentController.getAllStudents)
app.post('/signup', studentController.saveStudent)
app.post('/apiLogin', studentController.loginStudent)
app.get('/getStudentDetails/:id', studentController.getSingleStudentDetails)
app.post('/update',studentController.updateStudent)
app.get('/delete/:id', studentController.deleteStudent)

app.get('/hello', function(req,res){
  res.status(200).send('Thank you. I recieved your request')
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
