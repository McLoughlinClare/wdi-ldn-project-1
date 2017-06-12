const express      = require('express');
const router       = express.Router();

const day          = require('../controllers/day');
const registration = require('../controllers/registration');
const sessions     = require('../controllers/sessions');
const oauthController = require('../controllers/oauth');


const secureRoute  = require('../lib/secureRoute');
const upload       = require('../lib/upload');

const oauth = require('../config/oauth');

router.get('/', (req, res) => res.render('statics/index', { oauth }));

router.route('/register')
.get(registration.new)
.post(registration.create);

router.route('/login')
.get(sessions.new)
.post(sessions.create);

router.route('/oauth/fitbit')
.get(oauthController.fitbit);

router.route('/days')
.get(day.index)
.post(upload.single('image'), day.create);

router.route('/days/new')
.get(day.new)
.put(secureRoute, day.update);

router.route('days/:id')
.get(day.new)
.put(secureRoute, day.update)
.delete(secureRoute, day.delete);

router.route('days/:id/edit')
.get(day.edit)
.put(secureRoute, day.update)
.delete(secureRoute, day.delete);

router.route('/logout')
.delete(sessions.delete);

router.all('*', (req, res) => res.notFound());

module.exports = router;
