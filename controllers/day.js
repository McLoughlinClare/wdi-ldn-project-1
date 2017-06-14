const Day = require('../models/day');

function daysIndex(req, res, next) {
  Day
  .find({ createdBy: req.user })
  .exec()
  .then((days) => res.render('days/index', {days}))
  .catch(next);
}

function daysNew(req, res, next){
  Day
    .find()
    .exec()
    .then((days) => res.render('days/new', { days }))
    .catch(next);
}

function daysShow (req, res, next) {
  Day
  .findById(req.params.id)
  .exec()
  .then((day) => {
    if(!day) return res.status(404).end('Not found');
    res.render('days/show', { day });
  })
  .catch(next);
}

function createRoute(req, res, next) {
  if(req.file) req.body.image = req.file.key;
  console.log(req.user);
  req.body.createdBy = req.user;

  Day
    .create(req.body)
    .then(() => res.redirect('/days'))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest('/days/new', err.toString());
      next(err);
    });
}

function daysEdit (req, res, next) {
  Day
  .findById(req.params.id)
  .exec()
  .then(day => {
    if(!day) return res.redirect();

    return res.render('days/edit', { day });
  })
  .catch(next);
}


function daysUpdate (req, res, next) {
  Day
    .findById(req.params.id)
    .exec()
    .then(day => {
      if(!day) return res.notFound();

      for(const field in req.body) {
        day[field] = req.body[field];
      }

      return day.save();
    })
    .then(() => res.redirect(`/days/${req.params.id}`))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/days/${req.params.id}/edit`, err.toString());
      next(err);
    });
}

function daysDelete (req, res, next) {
  Day
  .findById(req.params.id)
  .exec()
  .then(day => {
    if(!day) return res.notFound();
    return day.remove();
  })
  .then(() => res.redirect('/days'))
  .catch(next);
}

module.exports ={
  index: daysIndex,
  new: daysNew,
  show: daysShow,
  create: createRoute,
  edit: daysEdit,
  update: daysUpdate,
  delete: daysDelete
};
