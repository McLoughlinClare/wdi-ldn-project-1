const User = require('../models/user');


function newRoute(req, res) {
  res.render('sessions/new');
}

function createRoute(req, res, next) {
  User
    .findOne({ username: req.body.username })
    .then((user) => {
      console.log(user);
      if(!user) {
        console.log('no user found');
        return req.session.regenerate(() => {
          req.flash('danger', 'You must be logged in.');
          res.redirect('/');
        });
      }

      // Re-assign the session id for good measure
      req.session.userId = user.id;

      res.locals.user = user;
      res.locals.isLoggedIn = true;

      req.flash('success', `Welcome back, ${user.username}!`);
      res.redirect(`/days`);
    })
    .catch(next);

}

function sessionsDelete(req, res){
  return req.session.regenerate(()=> res.redirect('/'));
}

module.exports = {
  new: newRoute,
  create: createRoute,
  delete: sessionsDelete
};
