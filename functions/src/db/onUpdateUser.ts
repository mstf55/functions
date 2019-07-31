import * as functions from 'firebase-functions';
import { Firestore } from '@google-cloud/firestore';
import * as constants from '../constants';
import * as admin from 'firebase-admin';




const firestore = new Firestore({
    projectId: constants.PROJECTID,
    timestampsInSnapshots: true
});


export function trackUserNameChange(change: functions.Change<FirebaseFirestore.DocumentSnapshot>) {

    let oldRecord, newRecord, oldName, newName;

    oldRecord = change.before.exists ? change.before.data() : null;
    newRecord = change.after.exists ? change.after.data() : null;


    oldName = oldRecord == null ? "" : oldRecord.userName;
    newName = newRecord == null ? "" : newRecord.userName;


    if (oldName !== newName) {

        firestore.collection(constants.CHANGE_COLLECTION_NAME)
            .add({ 'oldValue': oldName, 'newValue': newName ,'time': admin.firestore.FieldValue.serverTimestamp()}).then(doc => {
                console.log(doc.id);
            }).catch(err => {
                console.error(err);
            });

    }

    return;

}