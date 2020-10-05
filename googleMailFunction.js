const functions = require('firebase-functions');
const admin = require('firebase-admin');
var nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const cors = require("cors")({ origin: true });

admin.initializeApp(functions.config().firebase);

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'aegle.ccare@gmail.com',
      pass: '123Gpass'
  }
});

exports.sendMail = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    
      const mailOptions = {
          from: 'Aegle support <aegle.ccare@gmail.com>',
          to: "gauthamasok.dev@gmail.com",
          subject: 'TESTING!!!',
          html: `<p style="font-size: 16px;">This is a test mail..</p>`
      };

      // returning result
      return transporter.sendMail(mailOptions, (erro, info) => {
          if(erro){
              return res.send(erro.toString());
          }
          return res.send('Sent');
      });
  });    
});