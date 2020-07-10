import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

export const updateUserAtProjects = functions.firestore
  .document('users/{userId}')
  .onUpdate((change, context) => {
    const data = change.after.data();
    const userId = context.params.userId;
    return db
      .collection('projects')
      .where('userIds', 'array-contains', userId)
      .get()
      .then((projectsQuerySnap) => {
        projectsQuerySnap.forEach((projectQuerySnap) => {
          const usersUpdated = projectQuerySnap.data().users;
          usersUpdated[`${userId}`] = {
            displayName: data.displayName,
          };
          return db
            .collection('projects')
            .doc(projectQuerySnap.id)
            .update({
              users: usersUpdated,
            })
            .catch((err) => {
              console.log('Error getting documents', err);
              return Promise.reject(err);
            });
        });
      });
  });
