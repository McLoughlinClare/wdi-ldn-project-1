const User = require('../models/user');

function registrationsNew(req, res) {
  return res.render('registration/new');
}

function registrationsCreate(req, res, next) {
  if(req.file) req.body.image = req.file.key;
  
  User
    .create(req.body)
    .then((user) => {
      req.flash('success', `Thanks for registering, ${user.username}!`);
      res.redirect('/login');
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        req.flash('danger', 'Passwords do not match');
        res.redirect('/register');
      }
      next(err);
    });
}

module.exports = {
  new: registrationsNew,
  create: registrationsCreate
};
