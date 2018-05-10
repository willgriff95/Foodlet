const rp = require('request-promise');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');
const qs = require('querystring');

function twitter(req, res, next) {
  if (!req.body.oauth_token || !req.body.oauth_verifier) {
    const params = {
      consumer_key: process.env.TWITTER_APP_ID,
      consumer_secret: process.env.TWITTER_APP_SECRET,
      callback: req.body.redirectUri
    };
    // step 1, we send our APIs credentials to twitter, to get a request token
    // twitter will then send a second request to this endpoint with a token and verifier
    rp({
      method: 'POST',
      url: 'https://api.twitter.com/oauth/request_token',
      oauth: params
    })
      .then(response => {
        const oauthToken = qs.parse(response);
        return res.send(oauthToken);
      })
      .catch(next);
  } else {
    const params = {
      oauth_token: req.body.oauth_token,
      oauth_verifier: req.body.oauth_verifier
    };

    // step 2, when the second arrives with the token and verifier
    // we can make a request for an access token
    rp({
      method: 'POST',
      url: 'https://api.twitter.com/oauth/access_token',
      form: params
    })
      .then(response => {
        const token = qs.parse(response);
        const params = {
          consumer_key: process.env.TWITTER_APP_ID,
          consumer_secret: process.env.TWITTER_APP_SECRET,
          oauth_token: token.oauth_token
        };

        // step 3, we use the access token to get the user's profile data
        return rp({
          url: 'https://api.twitter.com/1.1/users/show.json',
          qs: {
            screen_name: token.screen_name
          },
          oauth: params,
          json: true
        });
      })
      .then(response => {
        // step 4, we cannot get the user's email address from twitter, so we have to search for a user
        // by their twitter id
        return User.findOne({ twitterId: response.id })
          .then((user) => {
            if(!user) {
              // if no user, we create a new user record, using their profile data
              user = new User({
                username: response.name
              });
            }
            // either way, we save the user record
            user.twitterId = response.id;
            user.picture = user.picture || response.profile_image_url.replace('_normal', '');
            return user.save();
          });
      })
      .then(user => {
        // step 5, we create a JWT and send it back to our angular app
        const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' });
        return res.status(200).json({ token: token });
      })
      .catch(next);
  }
}

module.exports = { twitter };
