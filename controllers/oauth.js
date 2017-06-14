const rp    = require('request-promise');
const oauth = require('../config/oauth');
const User  = require('../models/user');

function fitbit(req, res, next) {
  rp({
    method: 'POST',
    url: oauth.fitbit.accessTokenUrl,
    form: {
      client_id: oauth.fitbit.clientId,
      grant_type: 'authorization_code',
      code: req.query.code
    },
    headers: {
      'Authorization': `Basic ${oauth.fitbit.getAuthToken()}`
    },
    json: true
  })
  .then((token) => {
    oauth.fitbit.accessToken = token.access_token;
    return rp({
      method: 'GET',
      url: oauth.fitbit.profileUrl,
      headers: {
        'Authorization': `Bearer ${token.access_token}`
      },
      json: true
    });
  })
  .then((profile) => {
    return User
      .findOne({ fitbitId: profile.user.encodedId })
      .then((user) => {
        console.log(user);
        if(!user) {
          user = new User({
            username: profile.user.displayName
          });
        }

        user.fitbitId = profile.user.encodedId;
        return user.save();
      });
  })
  .then((user) => {
    req.user = user;
    req.session.userId = user.id;
    req.session.isAuthenticated = true;

    req.flash('info', `Welcome back, ${user.username}!`);
    res.redirect('/days');
  })
  .catch(next);
}

module.exports = {
  fitbit
};
