
import * as functions from 'firebase-functions';


export function capitalizeEveryNewNote(change: functions.Change<FirebaseFirestore.DocumentSnapshot>, context: functions.EventContext) {


  const document = change.after.exists ? change.after.data() : null;

  if (typeof (document) !== 'undefined' && document !== null) {

    const newContent = capitalizeEveryWord(document.content);


    return change.after.ref.set(
      {
        content: newContent
      }, { merge: true }
    )
  }
  return;

}


function capitalizeEveryWord(text: string): string {

  return text.split(' ').map(w => w.substring(0, 1).toUpperCase() + w.substring(1)).join(' ');

}
