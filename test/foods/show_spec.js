/* global api, describe, it, expect, beforeEach  */

const Food = require('../../models/food');

const foodData = {
  user: 'Caroline',
  title: '26 crackers',
  description: 'delicious crackers',
  location: {
    lat: 51.52,
    lng: -0.07
  },
  image: 'http://via.placeholder.com/350x150',
  active: true
};

let foodId;

describe('GET /foods/:id', () => {
  beforeEach(done => {
    Food
      .remove({})
      .then(() => Food.create(foodData))
      .then(food => {
        foodId = food._id;
      })
      .then(() => done());
  });

  it('should return a 200 response', done => {
    api
      .get(`/api/foods/${foodId}`)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return an object as response body', done => {
    api
      .get(`/api/foods/${foodId}`)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should return a valid food object', done => {
    api
      .get(`/api/foods/${foodId}`)
      .end((err, res) => {
        Object.keys(foodData).forEach(field => {
          expect(res.body[field]).to.deep.eq(foodData[field]);
        });
        done();
      });
  });

});
