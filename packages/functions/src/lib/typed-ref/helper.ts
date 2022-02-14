import { DocumentData, Firestore, FirestoreDataConverter } from "firebase-admin/firestore";

export const createConverter = <Data>(): FirestoreDataConverter<Data> => {
  return {
    toFirestore: (data) => {
      return data as DocumentData;
    },
    fromFirestore: (snap) => {
      return snap.data() as Data;
    },
  };
};

export const createTypedCollectionRef = <Data, CollectionPath extends (...args: any) => string>(
  db: Firestore,
  collectionPath: CollectionPath,
  converter: FirestoreDataConverter<Data>
) => {
  return (...collectionPathArgs: Parameters<CollectionPath>) => {
    return db.collection(collectionPath(collectionPathArgs)).withConverter(converter);
  };
};
