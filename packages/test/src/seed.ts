import { clearAuth, clearFirestore } from "./clear-emulator";
import { ArrayFactory, AuthUserFactory, UserTweetFactory } from "./factory";
import { wait } from "./util";

const main = async () => {
  await Promise.all([clearAuth(), clearFirestore()]);

  // FIXME: auth の方で email の重複エラーとか起きるので暫定対応
  await wait();

  const authUsers = await Promise.all(ArrayFactory.of(10).map(() => AuthUserFactory.of()));
  await Promise.all(
    authUsers.flatMap((authUser) =>
      ArrayFactory.of(10).map(() => UserTweetFactory.of({ creatorId: authUser.uid }))
    )
  );
};

main();
