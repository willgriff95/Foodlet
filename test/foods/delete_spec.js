/* global api, describe, it, expect, beforeEach */
const Food = require('../../models/food');
const User = require('../../models/user');
const { secret } = require('../../config/environment');
const jwt = require('jsonwebtoken');

const userData = {
  username: 'test',
  email: 'test@test',
  password: 'test',
  passwordConfirmation: 'test'
};

const foodData = {
  title: '26 crackers',
  description: 'delicious crackers',
  location: {
    lat: 51.52,
    lng: -0.07
  },
  image: 'http://via.placeholder.com/350x150',
  active: true
};

let token;
let newFood;

describe('DELETE /api/foods/:id', () => {
  beforeEach(done => {
    Promise.all([
      User.remove({}),
      Food.remove({})
    ])
      .then(() => User.create(userData))
      .then(user => {
        token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h'});
      })
      .then(() => Food.create(foodData))
      .then(food => {
        newFood = food;
      })
      .then(() => done());
  });

  it('should return a 401 respose without a token', done => {
    api
      .delete(`/api/foods/${newFood._id}`)
      .end((err,res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });

  it('should return a 204 response', done => {
    api
      .delete(`/api/foods/${newFood._id}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err,res) => {
        expect(res.status).to.eq(204);
        done();
      });
  });
});
