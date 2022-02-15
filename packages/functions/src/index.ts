import { Timestamp } from "firebase-admin/firestore";
import * as functions from "firebase-functions";

import { apiApp } from "./api";
import { db } from "./firebaseApp";
import { usersRef } from "./lib/typed-ref/index";

const TOKYO = "asia-northeast1";

const functionsAtTokyo = functions.region(TOKYO);

exports.api = functionsAtTokyo.https.onRequest(apiApp);

exports.onAuthCreate = functionsAtTokyo.auth.user().onCreate(async (user) => {
  await usersRef(db)
    .doc(user.uid)
    .set({
      displayName: user.displayName || "",
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
});

exports.onAuthDelete = functionsAtTokyo.auth.user().onDelete(async (user) => {
  await usersRef(db).doc(user.uid).delete();
});
