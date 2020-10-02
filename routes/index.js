var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Student Portal','subtemplate' : 'students' });
});

router.get('/signup',function(req,res,next){
  res.render('index', { title: 'Student Signup', 'subtemplate': 'signup'})
})

router.get('/login',(req,res, next) => {
  res.render('index', {title: 'Student Login', subtemplate: 'login'})
})

router.get('/edit', (req,res, next) => {
  const params = req.query;
  console.log(params);
  res.render('index', {title: 'Student Login', subtemplate: 'editStudent', studentId: params.id})
})

module.exports = router;
