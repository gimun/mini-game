/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});

admin.initializeApp();

exports.updateUserFields = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        if (req.method !== 'POST') {
            return res.status(405).send('Method Not Allowed');
        }

        const {updates} = req.body;

        if (!updates) {
            return res.status(400).send('Bad Request: No updates provided.');
        }

        const batch = admin.firestore().batch();

        try {
            updates.forEach(({id, fields}) => {
                const docRef = admin.firestore().collection('member').doc(id);
                batch.update(docRef, fields);
            });

            await batch.commit();
            return res.status(200).send({success: true, message: 'Batch update successful!'});
        } catch (error) {
            console.error('Error updating documents:', error);
            return res.status(500).send('Internal Server Error');
        }
    });
});

