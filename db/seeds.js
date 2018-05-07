const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environment');

const Food = require('../models/food');
const User = require('../models/user');

mongoose.connect(dbURI, (err, db) => {
  db.dropDatabase();

  Food.create([
    {
      title: '26 crackers',
      description: 'delicious crackers',
      location: {
        lat: 51.52,
        lng: -0.07
      },
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyjeNMBiwuIT37jax08VvK2Kow6KiuLsJ9kdUdNgA1Wvpbl05Q',
      active: true
    }, {
      title: 'Punnet of tomatoes',
      description: 'fresh',
      location: {
        lat: 51.515 ,
        lng: -0.078
      },
      image: 'https://1.bp.blogspot.com/-67b5IA_NG8c/VwnRgMQpKJI/AAAAAAAAQu8/F-ZQvf5i3QIcTAa_8UXC5tqyEXpZtg-Iw/s1600/tomatoes%2B-%2B1.jpg',
      active: true
    }, {
      title: '6 doughnuts',
      description: 'tasty',
      location: {
        lat: 51.54,
        lng: -0.06
      },
      image: 'http://www.dinnerwithjulie.com/wp-content/uploads/2017/05/Cereal-doughnuts-1.jpg',
      active: true
    }

  ]);


  User.create([
    {
      username: 'Caroline',
      email: 'caroline.roden94@gmail.com',
      password: 'a',
      passwordConfirmation: 'a',
      picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDJbvH4et6WSbhspzaU4rsrwyGjZLBSe4d-Hi-duuaELxFAQaG',
      location: {
        lat: 51.5,
        lng: -0.07
      }
    },
    {
      username: 'Hugo',
      email: 'hugocowan915@gmail.com',
      password: 'a',
      passwordConfirmation: 'a',
      picture: 'https://thesocietypages.org/socimages/files/2009/05/vimeo.jpg',
      location: {
        lat: 51.6,
        lng: -0.09
      }
    },
    {
      username: 'Will',
      email: 'will.a.griffiths@gmail.com',
      password: 'a',
      passwordConfirmation: 'a',
      picture: 'https://i.imgur.com/3embnlD.jpg',
      location: {
        lat: 51.4,
        lng: -0.06
      }
    }
  ])

    .then(foods => console.log(`${foods.length} foods created!`))
    .then(users => console.log(`${users.length} users were added to the DB.`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
});
