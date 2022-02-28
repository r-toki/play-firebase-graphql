import { Firestore } from "firebase-admin/firestore";
import { first } from "lodash";

import { getDocs } from "../query-util/get";
import { tweetsRef } from "../typed-ref";

export const getTweet = async (db: Firestore, { id }: { id: string }) => {
  const tweetDocs = await getDocs(tweetsRef(db).where("tweetId", "==", id));
  const tweetDoc = first(tweetDocs);
  if (!tweetDoc) throw new Error("tweetDoc not found at getTweet");
  return tweetDoc;
};
