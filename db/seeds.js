const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environment');

const Food = require('../models/food');
const User = require('../models/user');

mongoose.connect(dbURI, (err, db) => {
  db.dropDatabase();

  User.create([
    {
      username: 'Caroline',
      email: 'caroline.roden94@gmail.com',
      password: 'a',
      passwordConfirmation: 'a',
      picture: 'https://i.imgur.com/kXdfAyL.png',
      location: {
        lat: 51.54,
        lng: -0.06
      }
    },
    {
      username: 'Hugo',
      email: 'hugocowan915@gmail.com',
      password: 'a',
      passwordConfirmation: 'a',
      picture: 'https://thesocietypages.org/socimages/files/2009/05/vimeo.jpg',
      location: {
        lat: 51.54,
        lng: -0.06
      }
    },
    {
      username: 'Will',
      email: 'will.a.griffiths@gmail.com',
      password: 'a',
      passwordConfirmation: 'a',
      picture: 'https://i.imgur.com/3embnlD.jpg',
      location: {
        lat: 51.54,
        lng: -0.06
      }
    }
  ])
    .then(users => {
      console.log(`${users.length} users were added to the DB.`);
      return Food.create([
        {
          title: '26 crackers',
          description: 'delicious crackers',
          location: {
            lat: 51.52,
            lng: -0.07
          },
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyjeNMBiwuIT37jax08VvK2Kow6KiuLsJ9kdUdNgA1Wvpbl05Q',
          active: true,
          user: users[0]
        }, {
          title: 'Punnet of tomatoes',
          description: 'fresh',
          location: {
            lat: 51.515 ,
            lng: -0.078
          },
          image: 'http://www.producebusinessuk.com/images/default-source/insight/waitrose_13178276317644.tmb-765x500-cr.jpg?sfvrsn=0',
          active: true,
          user: users[1]
        }, {
          title: '6 doughnuts',
          description: 'tasty',
          location: {
            lat: 51.54,
            lng: -0.06
          },
          image: 'http://www.fortfindlaycoffee.com/wp-content/uploads/2015/04/fresh_doughnuts.jpg',
          active: true,
          user: users[2]
        }, {
          title: 'Pasta',
          description: 'Unopened bag of wholewheat pasta',
          location: {
            lat: 51.5,
            lng: -0.09
          },
          image: 'https://1.bp.blogspot.com/-sW1VDfjq7WM/VzG-KuSIKrI/AAAAAAABZkE/5sd0VJbmo7UpioJRaQjfDPioizvMIT7LQCLcB/s1600/P1410649.JPG',
          active: true,
          user: users[2]
        }, {
          title: 'Apricots',
          description: 'Fresh apricots from my garden, I\'ve grown too many!',
          location: {
            lat: 51.208,
            lng: -0.02
          },
          image: 'http://www.slowburningpassion.com/wp-content/uploads/2016/07/Bowl-of-ripe-apricots.jpg',
          active: true,
          user: users[0]
        }, {
          title: 'Olives',
          description: '1kg jar of Greek olives',
          location: {
            lat: 51.318,
            lng: -0.06
          },
          image: 'http://www.afooda.com/wp-content/uploads/2016/03/drained-green-olives.jpg',
          active: true,
          user: users[1]
        }, {
          title: 'Jar of peanut butter',
          description: 'Leftover jar of peanut butter which I don\'t like',
          location: {
            lat: 51.412,
            lng: -0.075
          },
          image: 'https://o.aolcdn.com/images/dims3/GLOB/crop/2045x1024+3+58/resize/630x315!/format/jpg/quality/85/http%3A%2F%2Fi.huffpost.com%2Fgen%2F5157324%2Fimages%2Fh-PEANUT-BUTTER-2048x1144.jpg',
          active: true,
          user: users[0]
        }, {
          title: 'Strawberries',
          description: 'From my strawberry farm',
          location: {
            lat: 52.6369,
            lng: 1.1398
          },
          image: 'https://korea.stripes.com/sites/korea.stripes.com/files/u1814/image_1_0.jpg',
          active: true,
          user: users[1]
        }, {
          title: 'Bananas',
          description: 'From my banana farm',
          location: {
            lat: 50.1934,
            lng: 1.8931
          },
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQorx0dT_iqiL-PUcM-bNlWIB0953vocqX1I9GtnDAZEKyfatxn',
          active: true,
          user: users[2]
        }

      ]);
    })
    .then(foods => console.log(`${foods.length} foods created!`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
});
