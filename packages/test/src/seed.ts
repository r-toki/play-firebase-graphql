import { Timestamp } from "firebase-admin/firestore";
import { addHours } from "date-fns";
import { clearAuth, clearFirestore } from "./clear-emulator";
import { ArrayFactory, AuthUserFactory, DateFactory, UserTweetFactory } from "./factory";
import { wait } from "./util";

const main = async () => {
  await Promise.all([clearAuth(), clearFirestore()]);

  // FIXME: auth の方で email の重複エラーとか起きるので暫定対応
  await wait();

  const authUsers = await Promise.all(ArrayFactory.of(10).map(() => AuthUserFactory.of()));
  await Promise.all(
    authUsers.flatMap((authUser, i) =>
      ArrayFactory.of(10).map((_, j) => {
        const createdAt = Timestamp.fromDate(addHours(DateFactory.of(), 10 * i + j));
        return UserTweetFactory.of({ creatorId: authUser.uid, createdAt, updatedAt: createdAt });
      })
    )
  );
};

main();
