import { collection, DocumentData, Firestore, FirestoreDataConverter } from "firebase/firestore";

export const createConverter = <Data>(): FirestoreDataConverter<Data> => {
  return {
    toFirestore: (data) => {
      return data as DocumentData;
    },
    fromFirestore: (snap, options) => {
      return snap.data(options) as Data;
    },
  };
};

export const createTypedCollectionRef = <Data, CollectionPath extends (...args: any) => string>(
  collectionPath: CollectionPath,
  converter: FirestoreDataConverter<Data>
) => {
  return (db: Firestore, ...collectionPathArgs: Parameters<CollectionPath>) => {
    return collection(db, collectionPath(collectionPathArgs)).withConverter(converter);
  };
};
