import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { capitalizeEveryNewNote } from './db/onWriteNote';
import { createUser } from './http/addUser';
import * as constants from './constants';
import { trackUserNameChange } from './db/onUpdateUser';


admin.initializeApp();


//firestore triggers

exports.modifyUser = functions.firestore
  .document(`${constants.USER_COLLECTION_NAME}/{userid}/${constants.NOTE_COLLECTION_NAME}/{noteid}`)
  .onWrite(capitalizeEveryNewNote);

  exports.trackUserNameChange = functions.firestore
  .document(`${constants.USER_COLLECTION_NAME}/{userid}`)
  .onWrite(trackUserNameChange);  


//http triggers
exports.createUser = functions.https.onRequest(createUser);









