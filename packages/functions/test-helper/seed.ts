import * as admin from "firebase-admin";
import { Timestamp } from "firebase-admin/firestore";

import { userTweetsRef } from "../src/lib/typed-ref/index";
import { UserTweetData } from "../src/lib/typed-ref/types";
import { clearAuth, clearFirestore } from "./clear-emulator";
import { FIREBASE_AUTH_EMULATOR_HOST, FIRESTORE_EMULATOR_HOST, PROJECT_ID } from "./constants";

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
  static of(init?: Partial<{ email: string; password: string }>) {
    return auth.createUser({
      email: `user-${this.n++}@example.com`,
      password: "password",
      ...init,
    });
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
  await Promise.all(
    authUsers.flatMap((authUser) =>
      ArrayFactory.of(10).map(() => UserTweetFactory.of({ creatorId: authUser.uid }))
    )
  );
};

main();
