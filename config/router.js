const router = require('express').Router();
const foods = require('../controllers/foods');
const users = require('../controllers/users');
const auth = require('../controllers/auth');
const secureRoute = require('../lib/secureRoute');

router.route('/foods')
  .get(foods.index)
  .post(secureRoute, foods.create);

router.route('/foods/:id')
  .get(foods.show)
  .put(secureRoute, foods.update)
  .delete(secureRoute, foods.delete);

router.route('/users/:id')
  .get(users.show);

router.post('/register', auth.register);
router.post('/login', auth.login);

module.exports = router;
