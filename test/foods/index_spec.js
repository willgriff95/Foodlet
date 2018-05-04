/* global api, describe, it, expect beforeEach */

const Food = require('../../models/food');

const foodData = ([
  {
    title: '26 crackers',
    description: 'delicious crackers',
    location: {
      lat: 51.52,
      lng: -0.07
    },
    image: 'http://via.placeholder.com/350x150',
    active: true
  }, {
    title: 'Punnet of tomatoes',
    description: 'fresh',
    location: {
      lat: 51.515,
      lng: -0.078
    },
    image: 'http://via.placeholder.com/350x150',
    active: true
  }
]);


describe('GET /foods', () => {
  beforeEach(done => {
    Food.remove({})
      .then(() => Food.create(foodData))
      .then(() => done());
  });

  it('should return a 200 response', done => {
    api
      .get('/api/foods')
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return an array as response body', done => {
    api
      .get('/api/foods')
      .end((err, res) => {
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should return an array of valid food objects', done => {
    api
      .get('/api/foods')
      .end((err, res) => {
        res.body
          .forEach((food, index) => {
            Object.keys(foodData[index]).forEach(field => {
              expect(food[field]).to.deep.eq(foodData[index][field]);
            });
          });
        done();
      });
  });

});
