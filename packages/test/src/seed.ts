import { addHours } from "date-fns";
import { UserRecord } from "firebase-admin/auth";
import { Timestamp } from "firebase-admin/firestore";
import { usersRef } from "functions/src/lib/typed-ref/index";

import { clearAuth, clearFirestore } from "./clear-emulator";
import { ArrayFactory, AuthUserFactory, DateFactory, UserTweetFactory } from "./factory";
import { db } from "./firebase-app";
import { wait } from "./util";

// NOTE: emulators:start --only auth,firestore で実行する。functions の trigger 無視していいように書いている
const main = async () => {
  await Promise.all([clearAuth(), clearFirestore()]);

  // FIXME: auth の方で email の重複エラーとか起きるので暫定対応
  await wait(1_000);

  const authUsers: UserRecord[] = [];

  // NOTE: onAuthCreate で userDoc が作られる
  for (let i = 0; i < 20; i++) {
    const authUser = await AuthUserFactory.of();
    authUsers.push(authUser);
  }

  await Promise.all(
    authUsers.map((authUser, i) =>
      ArrayFactory.of(10).map((_, j) => {
        const createdAt = Timestamp.fromDate(addHours(DateFactory.of(), 10 * i + j));
        return UserTweetFactory.of({ userId: authUser.uid, createdAt, updatedAt: createdAt });
      })
    )
  );

  await Promise.all(
    authUsers.map((authUser, i) => {
      const createdAt = Timestamp.fromDate(addHours(DateFactory.of(), i));
      return usersRef(db)
        .doc(authUser.uid)
        .set({
          displayName: authUser.email || "",
          createdAt,
          updatedAt: createdAt,
        });
    })
  );
};

main();
