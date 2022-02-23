import { Timestamp } from "firebase-admin/firestore";
import * as functions from "firebase-functions";

import { apiApp } from "./api";
import { db } from "./firebase-app";
import { usersRef } from "./lib/typed-ref/index";

const TOKYO = "asia-northeast1";

const functionsAtTokyo = functions.region(TOKYO);

exports.api = functionsAtTokyo.https.onRequest(apiApp);

exports.onAuthCreate = functionsAtTokyo.auth.user().onCreate(async (user) => {
  console.log(user.metadata.creationTime);
  const createdAt = Timestamp.fromMillis(Number(user.metadata.creationTime));
  await usersRef(db)
    .doc(user.uid)
    .set({
      displayName: user.email?.split("@")[0] || "",
      createdAt,
      updatedAt: createdAt,
    });
});

exports.onAuthDelete = functionsAtTokyo.auth.user().onDelete(async (user) => {
  await usersRef(db).doc(user.uid).delete();
});
