const router = require('express').Router();
const foods = require('../controllers/foods');
const users = require('../controllers/users');
const auth = require('../controllers/auth');
const oauth = require('../controllers/oauth');
const secureRoute = require('../lib/secureRoute');

router.route('/foods')
  .get(secureRoute, foods.index)
  .post(secureRoute, foods.create);

router.route('/foods/:id')
  .get(secureRoute, foods.show)
  .put(secureRoute, foods.update)
  .delete(secureRoute, foods.delete);

router.route('/foods/:id/requests')
  .post(secureRoute, foods.requestCreate);

router.route('/foods/:id/accept')
  .post(secureRoute, foods.requestAccept);

router.route('/users')
  .get(secureRoute, users.index);

router.route('/users/:id')
  .get(secureRoute, users.show);

router.post('/register', auth.register);
router.post('/login', auth.login);
router.post('/twitter', oauth.twitter);


module.exports = router;
