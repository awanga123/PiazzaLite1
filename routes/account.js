var express = require('express')
var router = express.Router()

var User = require('../models/user')
var isAuthenticated = require('../middlewares/isAuthenticated');

router.get('/signup', function(req, res) {
  res.render('signup')
})

router.post('/signup', function(req, res, next) {
  var { username, password } = req.body
  var u = new User({username: username, password: password})
  User.find({username, password}, function(err, results) {
    if (!err) {
      if (results.length !== 0) {
        next(new Error('Username is taken. Try again.'))
      } else {
        u.save(function(err) {
          if (!err) {
            res.redirect('/')
          } else {
            next(err)
          }
        })
      }
    } else {
      next(err)
    }
  })
})

router.get('/login', function(req, res) {
  res.render('login')
})

router.post('/login', function(req, res, next) {
  var { username, password } = req.body
  User.findOne({username: username, password: password}, function(err,result) {
    if (err) {
      next(err)
    } else if (!result) {
      next(new Error('Wrong username or password'))
    } else {
      req.session.user = result.username
      res.redirect('/');
    }
  }) 
})

router.get('/logout', isAuthenticated, function(req, res) {
  req.session.user = ''
  res.redirect('/')
})

// don't put any routes below here!
router.use(function(err, _, res) {
  return res.send('ERROR :  ' + err.message)
})


module.exports = router
