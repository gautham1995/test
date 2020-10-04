const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);
var database = admin.database();

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

exports.textToLength = functions.https.onRequest((request, response) => {
  var text = request.query.text;
  var textLength = text.length;
  response.send(String(textLength));
});


// onCreate
exports.newNodeDetected = functions.database.ref('users/{userIdRef}/name')
.onCreate((snapshot, context) => {
var name = snapshot.val();
var user = context.params.userIdRef;
console.log(name);
return null;
});

// onWrite
exports.writeDetected = functions.database.ref('users/{userIdRef}/name')
.onWrite((change, context) => {
var oldName = change.before.val();
var newName = change.after.val();
var user = context.params.userIdRef;
database.ref('metadata/lastChangedName/').set(user + " changed his name from " + oldName + " to " + newName);
return null;
});

// scheduled fucntion
exports.scheduledFunctionCrontab = functions.pubsub.schedule('52 11 * * *')
  .timeZone('Asia/Kolkata')
  .onRun((context) => {
      var date = new Date();
    database.ref("metadata/lastUpdate/").set("This will be run every day at 11:52 AM " + date.getTime());
  return null;
});