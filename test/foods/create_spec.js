/* global api, describe, it, expect, beforeEach */
const jwt = require('jsonwebtoken');
const { secret } = require('../../config/environment');

const Food = require('../../models/food');
const User = require('../../models/user');

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

describe('POST /foods', () => {
  beforeEach(done => {
    Promise.all([
      User.remove({}),
      Food.remove({})
    ])
      .then(() => User.create(userData))
      .then(user => {
        token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h'});
      })
      .then(() => done());
  });
  it('should return a 401 response without a token', done => {
    api
      .post('/api/foods')
      .send(foodData)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });
  it('should return a 201 response with a token', done => {
    api
      .post('/api/foods')
      .set('Authorization', `Bearer ${token}` )
      .send(foodData)
      .end((err, res) => {
        expect(res.status).to.eq(201);
        done();
      });
  });
  it('should return a valid food object', done => {
    api
      .post('/api/foods')
      .set('Authorization', `Bearer ${token}`)
      .send(foodData)
      .end((err, res) => {
        expect(res.body._id).to.be.a('string');
        Object.keys(foodData).forEach(field => {
          expect(res.body[field]).to.deep.eq(foodData[field]);
        });
        done();
      });
  });
});
