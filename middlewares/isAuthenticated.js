var isAuthenticated = function(req, res, next) {
  if (req.session.user) {
    next()
  } else {
    // res.send("you aren't authenticated")
    next(new Error('you are not authenticated'))
  }
}

module.exports = isAuthenticated