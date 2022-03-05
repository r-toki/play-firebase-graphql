import { Timestamp } from "firebase-admin/firestore";
import { z } from "zod";

export const User = z
  .object({
    displayName: z.string().min(1).max(255),
    createdAt: z.instanceof(Timestamp),
    updatedAt: z.instanceof(Timestamp),
  })
  .strict();
