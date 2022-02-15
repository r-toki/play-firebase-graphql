import * as admin from "firebase-admin";

export function getAdmin() {
  if (admin.apps.length > 0) {
    return admin.apps[0] as admin.app.App;
  } else {
    const app = admin.initializeApp();
    return app;
  }
}

export const auth = getAdmin().auth();

export const db = getAdmin().firestore();

export async function verifyIdToken(idToken: string) {
  return await auth.verifyIdToken(idToken);
}
