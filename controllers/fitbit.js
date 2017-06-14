const rp = require('request-promise');
const Promise = require('bluebird');

function fitbitProxy(req, res){
  const { accessToken } = require('../config/oauth').fitbit;

  const promises = {
    sleep: rp({
      //The ID of the user. Use "-" (dash) for current logged-in user.
      url: `https://api.fitbit.com/1.2/user/-/sleep/date/${req.query.date}.json`,
      method: 'GET',
      json: true,
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }),
    activity: rp({
      //The ID of the user. Use "-" (dash) for current logged-in user.
      url: `https://api.fitbit.com/1.2/user/-/activities/date/${req.query.date}.json`,
      method: 'GET',
      json: true,
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
  };

  Promise.props(promises)
  .then((data) => {
    res.json(data);
  });
}

module.exports = {
  proxy: fitbitProxy
};
