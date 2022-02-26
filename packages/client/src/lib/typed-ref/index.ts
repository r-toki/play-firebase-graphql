import { pathBuilder } from "@rei-sogawa/path-builder";
import type { TweetEventsPath } from "interfaces/path";
import type { TweetEventData } from "interfaces/web-schema";

import { createConverter, createTypedCollectionRef } from "./helper";

export const tweetEventsRef = createTypedCollectionRef(
  pathBuilder<TweetEventsPath>("tweetEvents"),
  createConverter<TweetEventData>()
);
