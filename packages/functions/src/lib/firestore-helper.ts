import { CollectionReference, DocumentReference, Query } from "firebase-admin/firestore";

export const getDoc = async <T>(docRef: DocumentReference<T>) => {
  const doc = await docRef.get();
  if (!doc.exists) throw new Error("");
  return { id: doc.id, ref: doc.ref, ...(doc.data() as T) };
};

export const getDocs = <T>(collectionRef: CollectionReference<T> | Query<T>) =>
  collectionRef
    .get()
    .then(({ docs }) => docs.map((doc) => ({ id: doc.id, ref: doc.ref, ...doc.data() })));
