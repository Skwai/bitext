const functions = require('firebase-functions')
const admin = require('firebase-admin')
const fetch = require('node-fetch')
const config = require('./config')
require('firebase/firestore')

admin.initializeApp(functions.config().firebase)
const db = admin.firestore()

exports.checkBtcPrice = functions.https.onRequest((request, response) => {
  fetch(config.COINDESK.url)
    .then((res) => res.json())
    .then((data) => {
      const price = 4500 // data.bpi.USD.rate_float

      db.collection('users')
        .where('high', '<=', price)
        .get()
        .then((snapshot) => {
          const phoneNumbers = []
          snapshot.forEach((doc) => phoneNumbers.push(doc.data().phoneNumber))
          response.send(phoneNumbers)
        })
        .catch((err) => console.error(err))
    })
})
