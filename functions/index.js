const functions = require('firebase-functions')
const admin = require('firebase-admin')
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
