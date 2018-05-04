const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environment');

const Food = require('../models/food');
const User = require('../models/user');

mongoose.connect(dbURI, (err, db) => {
  db.dropDatabase();

  Food.create([
    {
      user: 'Caroline',
      title: '26 crackers',
      description: 'delicious crackers',
      location: {
        lat: 51.52,
        lng: -0.07
      },
      image: 'http://via.placeholder.com/350x150',
      active: true
    }, {
      user: 'Hugo',
      title: 'Punnet of tomatoes',
      description: 'fresh',
      location: {
        lat: 51.515 ,
        lng: -0.078
      },
      image: 'http://via.placeholder.com/350x150',
      active: true
    }, {
      user: 'Will',
      title: '6 doughnuts',
      description: 'tasty',
      location: {
        lat: 51.54,
        lng: -0.06
      },
      image: 'http://via.placeholder.com/350x150',
      active: true
    }

  ]);


  User.create([
    {
      username: 'Caroline',
      email: 'caroline.roden94@gmail.com',
      password: 'a',
      passwordConfirmation: 'a',
      picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDJbvH4et6WSbhspzaU4rsrwyGjZLBSe4d-Hi-duuaELxFAQaG'
    },
    {
      username: 'Hugo',
      email: 'hugocowan915@gmail.com',
      password: 'a',
      passwordConfirmation: 'a',
      picture: 'https://thesocietypages.org/socimages/files/2009/05/vimeo.jpg'
    },
    {
      username: 'Will',
      email: 'will.a.griffiths@gmail.com',
      password: 'a',
      passwordConfirmation: 'a',
      picture: 'https://i.imgur.com/3embnlD.jpg'
    }
  ])

    .then(foods => console.log(`${foods.length} foods created!`))
    .then(users => console.log(`${users.length} users were added to the DB.`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
});
