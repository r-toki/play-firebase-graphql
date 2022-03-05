import { ExtractPathParams, pathBuilder } from "@rei-sogawa/path-builder";
import {
  collection,
  collectionGroup,
  DocumentData,
  Firestore,
  FirestoreDataConverter,
} from "firebase/firestore";

export const typedCollectionRef = <Data, Path extends string>(path: Path) => {
  const converter: FirestoreDataConverter<Data> = {
    toFirestore: (data) => {
      return data as DocumentData;
    },
    fromFirestore: (snap) => {
      return snap.data() as Data;
    },
  };

  return (db: Firestore, pathParams: ExtractPathParams<Path>) => {
    return collection(db, pathBuilder(path)(pathParams)).withConverter(converter);
  };
};

export const typedCollectionGroupRef = <Data>(path: string) => {
  const converter: FirestoreDataConverter<Data> = {
    toFirestore: (data) => {
      return data as DocumentData;
    },
    fromFirestore: (snap) => {
      return snap.data() as Data;
    },
  };

  return (db: Firestore) => {
    return collectionGroup(db, path).withConverter(converter);
  };
};
