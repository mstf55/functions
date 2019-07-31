
import { Firestore } from '@google-cloud/firestore';
import * as functions from 'firebase-functions';
import * as constants from '../constants';






const firestore = new Firestore({
    projectId: constants.PROJECTID,
    timestampsInSnapshots: true
});


export function createUser(request: functions.https.Request, response: functions.Response) {

    if (request.method !== "POST") {
        response.status(constants.STATUS_BAD_REQUEST).send('Please send a POST request');
        return;
    }


    const data = (request.body) || {};

    return firestore.collection(constants.USER_COLLECTION_NAME)
        .add({ 'email': data.email, 'displayName': data.displayName})
        .then(doc => {
            return response.status(constants.STATUS_SUCCESS).send(doc);
        }).catch(err => {
            console.error(err);
            return response.status(constants.STATUS_WENT_WRONG).send({ error: 'something goes wrong', err });
        });




}