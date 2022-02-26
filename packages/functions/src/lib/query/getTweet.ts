import { Firestore } from "firebase-admin/firestore";
import { first } from "lodash";

import { tweetsRef } from "../typed-ref";
import { getDocs } from "./util/get";

export const getTweet = async (db: Firestore, { tweetId }: { tweetId: string }) => {
  const tweetDocs = await getDocs(tweetsRef(db).where("tweetId", "==", tweetId));
  const tweetDoc = first(tweetDocs);
  if (!tweetDoc) throw new Error("tweetDoc not found at getTweet");
  return tweetDoc;
};
