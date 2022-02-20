import { DocumentReference } from "@/_universal";

export type WithIdAndRef<T> = T & { id: string; ref: DocumentReference };
