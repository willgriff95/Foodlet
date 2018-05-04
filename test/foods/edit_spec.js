/* global api, describe, it, expect beforeEach */

const Food = require('../../models/food');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../../config/environment');

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

describe('PUT /api/foods/:id', () => {
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

  it('should return 401 response without token', done => {
    api
      .put(`/api/foods/${newFood._id}`)
      .send(Object.assign({}, foodData))
      .end((err,res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });

  it('should return 200 response', done => {
    api
      .put(`/api/foods/${newFood._id}`)
      .send(Object.assign(foodData))
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.body._id).to.be.a('string');
        Object.keys(foodData).forEach(field => {
          expect(res.body[field]).to.deep.eq(foodData[field]);
        });
        done();
      });
  });
});
