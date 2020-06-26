var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

const express = require('express');
const bodyparser = require('body-parser')
const app = express();
const cors = require('cors');
const http = require('http').createServer(app);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://crud-53a03.firebaseio.com"
});

let db = admin.firestore();
let userRef = db.collection('users');

app.use(bodyparser.urlencoded( { extended: true } ));
app.use(bodyparser.json());
app.use(cors());

app.post('/addData', (req, res) => {
  userRef.doc(req.body.email).set({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  }).then(() => {
    console.log('User Added');
    res.send('User Added');
  }).catch((error) => {
    console.log(error);
    res.send(error);
  });
});

app.get('/getUsers', (req, res) => {
  let users = [];
  userRef.get().then((snapshot) => {
    snapshot.forEach((doc) => {
      users.push(doc.data());
      console.log(doc.id, " => ", doc.data());
    });
    console.log(users);
    res.send(users);

  }).catch((error) => {
    console.log(error);
  });
})

app.delete('/deleteUser', (req, res) => {
  userRef.doc(req.query.email).delete().then(() => {
    console.log('User Deleted');
    res.send('User Deleted');
  }).catch((error) => {
    console.log(error);
    res.send(error);
  });
});

http.listen(3000, () => {
  console.log('listening on http://localhost:3000');
});
