import { ExtractPathParams, pathBuilder } from "@rei-sogawa/path-builder";
import { DocumentData, Firestore, FirestoreDataConverter } from "firebase-admin/firestore";

class Counter {
  static _id = 0;

  public id: string;
  public name: string;
  public count = 0;
  constructor(name: string) {
    this.id = (ReadCounter._id++).toString();
    this.name = name;
  }
  public inc() {
    this.count++;
  }
}

class ReadCounter extends Counter {
  constructor(name: string) {
    super(name);
  }
  public out() {
    console.log(`read ${this.name} doc : ${this.count}`);
  }
}

class WriteCounter extends Counter {
  constructor(name: string) {
    super(name);
  }
  public out() {
    console.log(`write ${this.name} doc : ${this.count}`);
  }
}

export const typedCollectionRef = <Data, Path extends string>(path: Path) => {
  const readCounter = new ReadCounter(path);
  const writeCounter = new WriteCounter(path);

  const converter: FirestoreDataConverter<Data> = {
    toFirestore: (data) => {
      writeCounter.inc();
      writeCounter.out();
      return data as DocumentData;
    },
    fromFirestore: (snap) => {
      readCounter.inc();
      readCounter.out();
      return snap.data() as Data;
    },
  };

  return (db: Firestore, pathParams: ExtractPathParams<Path>) => {
    return db.collection(pathBuilder(path)(pathParams)).withConverter(converter);
  };
};

export const typedCollectionGroupRef = <Data>(path: string) => {
  const readCounter = new ReadCounter(path);
  const writeCounter = new WriteCounter(path);

  const converter: FirestoreDataConverter<Data> = {
    toFirestore: (data) => {
      writeCounter.inc();
      writeCounter.out();
      return data as DocumentData;
    },
    fromFirestore: (snap) => {
      readCounter.inc();
      readCounter.out();
      return snap.data() as Data;
    },
  };

  return (db: Firestore) => {
    return db.collectionGroup(path).withConverter(converter);
  };
};
