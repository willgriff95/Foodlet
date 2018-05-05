const User = require('../models/user');

function indexRoute(req, res, next){
  User
    .find()
    .exec()
    .then(users => res.json(users))
    .catch(next);
}

function showRoute(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then(user => {
      if(!user) return res.sendStatus(404);
      return res.render('users/show', { user });
    })
    .catch(next);
}


module.exports = {
  show: showRoute,
  index: indexRoute
};
