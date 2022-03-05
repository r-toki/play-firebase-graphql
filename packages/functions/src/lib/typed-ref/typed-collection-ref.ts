import { ExtractPathParams, pathBuilder } from "@rei-sogawa/path-builder";
import { DocumentData, Firestore, FirestoreDataConverter } from "firebase-admin/firestore";

import { ReadCounter, WriteCounter } from "./logger";

const WITH_LOG = false;

export const typedCollectionRef = <Data, Path extends string>(path: Path) => {
  const withLog = process.env.FUNCTIONS_EMULATOR && WITH_LOG;

  const readCounter = withLog ? new ReadCounter(path) : undefined;
  const writeCounter = withLog ? new WriteCounter(path) : undefined;

  const converter: FirestoreDataConverter<Data> = {
    toFirestore: (data) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      if (withLog) writeCounter!.log();
      return data as DocumentData;
    },
    fromFirestore: (snap) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      if (withLog) readCounter!.log();
      return snap.data() as Data;
    },
  };

  return (db: Firestore, pathParams: ExtractPathParams<Path>) => {
    return db.collection(pathBuilder(path)(pathParams)).withConverter(converter);
  };
};

export const typedCollectionGroupRef = <Data>(path: string) => {
  const withLog = process.env.FUNCTIONS_EMULATOR && WITH_LOG;

  const readCounter = withLog ? new ReadCounter(path) : undefined;
  const writeCounter = withLog ? new WriteCounter(path) : undefined;

  const converter: FirestoreDataConverter<Data> = {
    toFirestore: (data) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      if (withLog) writeCounter!.log();
      return data as DocumentData;
    },
    fromFirestore: (snap) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      if (withLog) readCounter!.log();
      return snap.data() as Data;
    },
  };

  return (db: Firestore) => {
    return db.collectionGroup(path).withConverter(converter);
  };
};
