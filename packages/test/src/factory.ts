import { Timestamp } from "firebase-admin/firestore";

import { userTweetsRef } from "functions/src/lib/typed-ref";
import { UserTweetData } from "functions/src/lib/typed-ref/types";
import { auth, db } from "./firebase-app";

export class ArrayFactory {
  static of(init = 0) {
    return Array.from({ length: init });
  }
}

export class DateFactory {
  static of(init = "2000-01-01 00:00:00") {
    return new Date(init);
  }
}

export class AuthUserFactory {
  static n = 0;
  static of(init?: Partial<{ email: string; password: string }>) {
    return auth.createUser({
      email: `user-${this.n++}@example.com`,
      password: "password",
      ...init,
    });
  }
}

export class UserTweetFactory {
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
