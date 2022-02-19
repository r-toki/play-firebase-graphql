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
  collectionPath: CollectionPath,
  converter: FirestoreDataConverter<Data>
) => {
  return (db: Firestore, collectionPathOptions: Parameters<CollectionPath>[0]) => {
    return db.collection(collectionPath(collectionPathOptions)).withConverter(converter);
  };
};
