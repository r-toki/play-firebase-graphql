import * as admin from "firebase-admin";
import { Timestamp } from "firebase-admin/firestore";
import request from "request";

import { userTweetsRef } from "../src/lib/typed-ref/index";
import { UserTweetData } from "../src/lib/typed-ref/types";

const PROJECT_ID = "playground-67a20";
const FIREBASE_AUTH_EMULATOR_HOST = "localhost:9099";
const FIRESTORE_EMULATOR_HOST = "localhost:8080";

process.env.FIREBASE_AUTH_EMULATOR_HOST = FIREBASE_AUTH_EMULATOR_HOST;
process.env.FIRESTORE_EMULATOR_HOST = FIRESTORE_EMULATOR_HOST;

admin.initializeApp({ projectId: PROJECT_ID });

const auth = admin.auth();
const db = admin.firestore();

class ArrayFactory {
  static of(init = 0) {
    return Array.from({ length: init });
  }
}

class DateFactory {
  static of(init = "2000-01-01 00:00:00") {
    return new Date(init);
  }
}

class AuthUserFactory {
  static n = 0;
  static of() {
    return auth.createUser({ email: `user-${this.n++}@example.com`, password: "password" });
  }
}

class UserTweetFactory {
  static n = 0;
  static of(init: Pick<UserTweetData, "creatorId"> & Partial<UserTweetData>) {
    return userTweetsRef(db, { userId: init.creatorId }).add({
      content: "MyString",
      createdAt: Timestamp.fromDate(DateFactory.of()),
      updatedAt: Timestamp.fromDate(DateFactory.of()),
      ...init,
    });
  }
}

const clearFirestore = () =>
  request({
    url: `http://${FIRESTORE_EMULATOR_HOST}/emulator/v1/projects/${PROJECT_ID}/databases/(default)/documents`,
    method: "DELETE",
  });

const clearAuth = () =>
  request({
    url: `http://${FIREBASE_AUTH_EMULATOR_HOST}/emulator/v1/projects/${PROJECT_ID}/accounts`,
    method: "DELETE",
  });

const stop = (ms = 0) =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve(true);
    }, ms)
  );

const main = async () => {
  await Promise.all([clearAuth(), clearFirestore()]);

  // FIXME: auth の方で email の重複エラーとか起きるので暫定対応
  await stop();

  const authUsers = await Promise.all(ArrayFactory.of(10).map(() => AuthUserFactory.of()));
  const userTweets = await Promise.all(
    authUsers.flatMap((authUser) =>
      ArrayFactory.of(10).map(() => UserTweetFactory.of({ creatorId: authUser.uid }))
    )
  );
};

main();
