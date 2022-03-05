import type { TweetEventsPath } from "interfaces/path";
import type { TweetEventData } from "interfaces/web-schema";

import { typedCollectionRef } from "./typed-collection-ref";

export const tweetEventsRef = typedCollectionRef<TweetEventData, TweetEventsPath>("tweetEvents");
