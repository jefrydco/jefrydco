const functions = require('firebase-functions')
const admin = require('firebase-admin')
const cors = require('cors')({ origin: 'https://jefrydco.id' })

require('es6-promise').polyfill()
require('isomorphic-fetch')

const serviceAccount = require('./jefrydco-firebase-adminsdk.json')

// Taken from: https://firebase.google.com/docs/firestore/manage-data/delete-data#collections
function deleteCollection(db, collectionPath, batchSize) {
  const collectionRef = db.collection(collectionPath)
  const query = collectionRef.orderBy('__name__').limit(batchSize)

  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, query, resolve, reject)
  })
}

function deleteQueryBatch(db, query, resolve, reject) {
  query
    .get()
    .then((snapshot) => {
      // When there are no documents left, we are done
      if (snapshot.size === 0) {
        return 0
      }

      // Delete documents in a batch
      const batch = db.batch()
      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref)
      })

      return batch.commit().then(() => {
        return snapshot.size
      })
    })
    .then((numDeleted) => {
      if (numDeleted === 0) {
        resolve()
        return
      }

      // Recurse on the next process tick, to avoid
      // exploding the stack.
      process.nextTick(() => {
        deleteQueryBatch(db, query, resolve, reject)
      })
    })
    .catch(reject)
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://jefrydco.firebaseio.com'
})
const db = admin.firestore()

exports.deleteFlexboxSurvey = functions.pubsub
  .schedule('every 1 months')
  .timeZone('Asia/Jakarta')
  .onRun(() => deleteCollection(db, 'flexbox-survey', 10))

exports.validateRecaptcha = functions.https.onRequest((req, res) => {
  if (req.method !== 'POST' || req.get('origin') !== 'https://jefrydco.id') {
    return res.sendStatus(403)
  }
  return cors(req, res, async () => {
    try {
      const { token } =
        typeof req.body === 'string' ? JSON.parse(req.body) : req.body
      if (!token) {
        throw new Error('Token must be provided')
      }
      const response = await fetch(
        'https://www.google.com/recaptcha/api/siteverify',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: `secret=${
            functions.config().recaptcha.secret
          }&response=${token}`
        }
      )
      const { success } = await response.json()
      res.send({ success })

      console.log({ origin: req.get('origin') })
      console.log(
        typeof req.body === 'string' ? JSON.parse(req.body) : req.body
      )
      console.log({ success })
    } catch (error) {
      console.log(error)
      res.sendStatus(500)
    }
  })
})
