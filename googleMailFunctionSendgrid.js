const functions = require('firebase-functions');
const admin = require('firebase-admin');
// var nodemailer = require('nodemailer');
// const smtpTransport = require('nodemailer-smtp-transport');
// const cors = require("cors")({ origin: true });
admin.initializeApp(functions.config().firebase);
// var database = admin.database();


exports.onItemCreation = functions.firestore.document('purchases/{purchaseId}')
.onCreate(async(snapshot, context) => {
    const itemDataSnap = await snapshot.ref.get()
    return admin.firestore().collection('mail').add({
       to: [itemDataSnap.data().email],
       message: {
         subject: 'Your reservation is here !',
         html: 'Hey '+ itemDataSnap.data().name +'. This is your reservation for the event and it costs $' + itemDataSnap.data().dollarqty +', thanks for the purchase.',
       }
     }).then(() => console.log('Queued email for delivery!'));
});