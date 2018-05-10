const smtpTransport = require('nodemailer-smtp-transport');
const nodemailer = require('nodemailer');
const Promise = require('bluebird');



const transporter = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: 'username',
    pass: 'password'
  }
}));



function sendMail(mailOptions, user, owner) {
  Object.assign(mailOptions, {
    from: `'${user.username}' <${user.email}>`,
    to: `'${owner.username}' <${owner.email}>`,
    subject: 'Request to collect',
    text: 'Hi, I\'d like to pick up the food you\'re offering'

  });

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function(err, info) {
      if(err) return reject(err);
      resolve(info);
    });
  });
}

module.exports = {
  sendMail
};
