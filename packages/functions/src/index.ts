import { FieldValue, Timestamp } from "firebase-admin/firestore";
import * as functions from "firebase-functions";

import { createApiApp } from "./api-app";
import { db } from "./firebase-app";
import { tweetEventsRef, usersRef } from "./lib/typed-ref/index";

const TOKYO = "asia-northeast1";

const functionsAtTokyo = functions.region(TOKYO);

const apiApp = createApiApp();
exports.api = functionsAtTokyo.https.onRequest(apiApp);

exports.onAuthCreate = functionsAtTokyo.auth.user().onCreate(async (user) => {
  const createdAt = Timestamp.now();
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

exports.onTweetWrite = functionsAtTokyo.firestore
  .document("users/{userId}/tweets/{tweetId}")
  .onWrite(async (change, context) => {
    const before = change.before.exists;
    const after = change.after.exists;

    const type = before ? (after ? "update" : "delete") : after ? "create" : null;
    if (!type) throw new Error("");

    const { userId, tweetId } = context.params;

    await tweetEventsRef(db)
      .doc(context.eventId)
      .set({ type, userId, tweetId, createdAt: FieldValue.serverTimestamp() as Timestamp });
  });
