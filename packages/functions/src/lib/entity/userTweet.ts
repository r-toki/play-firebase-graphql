import { Timestamp } from "firebase-admin/firestore";
import { z } from "zod";

export const UserTweet = z
  .object({
    id: z.string().min(1),
    userId: z.string().min(1),
    content: z.string().min(1).max(140),
    createdAt: z.instanceof(Timestamp),
    updatedAt: z.instanceof(Timestamp),
  })
  .strict();
