const rp = require('request-promise');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');

function twitter(req, res, next){
  rp({
    method: 'GET',
    url: 'https://twitter.com/login/oauth/access_token',
    qs: {
      client_id: req.body.clientId,
      client_secret: process.env.TWITTER_APP_SECRET,
      code: req.body.code
    },
    json: true
  })
    .then(token => {
      return rp({
        method: 'GET',
        url: 'https://api.twitter.com/user',
        qs: token,
        headers: {
          'User-Agent': 'CarolineRoden94'
        },
        json: true
      });
    })
    .then(profile => {
      return User
        .findOne({ $or: [{ email: profile.email }, { twitterId: profile.id }] })
        .then(user => {
          if(!user) {
            user = new User({ username: profile.login });
            if(profile.email) user.email = profile.email;
          }
          user.twitterId = profile.id;
          return user.save();
        });
    })
    .then(user => {
      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' });
      res.json({
        message: `Welcome back ${user.username}!`,
        token
      });
    })
    .catch(next);
}

module.exports = { twitter };
