const User = require('../models/user');

function showRoute(req, res) {
  User
    .findById(req.params.id)
    .exec()
    .then(user => {
      if(!user) return res.sendStatus(404);
      return res.render('users/show', { user });
    })
    .catch(err => {
      console.log(err);
      return res.sendStatus(500);
    });
}


module.exports = {
  show: showRoute
};
