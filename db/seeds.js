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
      picture: 'https://i.imgur.com/nNuTtsL.png',
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
          image: 'https://1.bp.blogspot.com/-67b5IA_NG8c/VwnRgMQpKJI/AAAAAAAAQu8/F-ZQvf5i3QIcTAa_8UXC5tqyEXpZtg-Iw/s1600/tomatoes%2B-%2B1.jpg',
          active: true,
          user: users[1]
        }, {
          title: '6 doughnuts',
          description: 'tasty',
          location: {
            lat: 51.54,
            lng: -0.06
          },
          image: 'http://www.dinnerwithjulie.com/wp-content/uploads/2017/05/Cereal-doughnuts-1.jpg',
          active: true,
          user: users[2]
        }, {
          title: 'Pasta',
          description: 'Unopened bag of wholewheat pasta',
          location: {
            lat: 51.5,
            lng: -0.02
          },
          image: 'https://img.tesco.com/Groceries/pi/305/5000119532305/IDShot_540x540.jpg',
          active: true,
          user: users[2]
        }, {
          title: 'Apricots',
          description: 'Fresh apricots from my garden, I\'ve grown too many!',
          location: {
            lat: 51.008,
            lng: -0.03
          },
          image: 'http://www.slowburningpassion.com/wp-content/uploads/2016/07/Bowl-of-ripe-apricots.jpg',
          active: true,
          user: users[0]
        }, {
          title: 'Olives',
          description: '1kg jar of Greek olives',
          location: {
            lat: 51.118,
            lng: -0.06
          },
          image: 'https://cdn.shopify.com/s/files/1/0206/9470/products/60470_HFARM_9332683000024-1_500d4751-a5d0-458b-900c-3d7d83390fca_1024x1024.jpeg?v=1441108615',
          active: true,
          user: users[1]
        }

      ]);
    })
    .then(foods => console.log(`${foods.length} foods created!`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
});
