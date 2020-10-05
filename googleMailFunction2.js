const functions = require('firebase-functions');
// const admin = require('firebase-admin');
var nodemailer = require('nodemailer');
// const smtpTransport = require('nodemailer-smtp-transport');
// const cors = require("cors")({ origin: true });

// admin.initializeApp(functions.config().firebase);

// const gmailEmail = functions.config().gmail.email;
// const gmailPassword = functions.config().gmail.password;
const gmailEmail = "aegle.ccare@gmail.com";
const gmailPassword = "123Gpass";
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});
const APP_NAME = 'Cloud Storage for Firebase quickstart';
// [START sendWelcomeEmail]

// exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {

exports.sendWelcomeEmail = functions.https.onRequest((req, res) => {

    const email = "gauthamasok.dev@gmail.com"; // The email of the user.
    const displayName = "gautham"; // The display name of the user.
    return sendWelcomeEmail(email, displayName);
  });
  // [END sendWelcomeEmail]

  async function sendWelcomeEmail(email, displayName) {
    const mailOptions = {
      from: `${APP_NAME} <noreply@firebase.com>`,
      to: email,
    };
      // The user subscribed to the newsletter.
  mailOptions.subject = `Welcome to ${APP_NAME}!`;
  mailOptions.text = `Hey ${displayName || ''}! Welcome to ${APP_NAME}. I hope you will enjoy our service.`;
  await mailTransport.sendMail(mailOptions);
  console.log('New welcome email sent to:', email);
  return null;
}