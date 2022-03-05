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
  const withLog = process.env.FUNCTIONS_EMULATOR && true;

  const readCounter = withLog ? new ReadCounter(path) : undefined;
  const writeCounter = withLog ? new WriteCounter(path) : undefined;

  const converter: FirestoreDataConverter<Data> = {
    toFirestore: (data) => {
      if (withLog) {
        writeCounter!.inc();
        writeCounter!.out();
      }
      return data as DocumentData;
    },
    fromFirestore: (snap) => {
      if (withLog) {
        readCounter!.inc();
        readCounter!.out();
      }
      return snap.data() as Data;
    },
  };

  return (db: Firestore, pathParams: ExtractPathParams<Path>) => {
    return db.collection(pathBuilder(path)(pathParams)).withConverter(converter);
  };
};

export const typedCollectionGroupRef = <Data>(path: string) => {
  const withLog = process.env.FUNCTIONS_EMULATOR && false;

  const readCounter = withLog ? new ReadCounter(path) : undefined;
  const writeCounter = withLog ? new WriteCounter(path) : undefined;

  const converter: FirestoreDataConverter<Data> = {
    toFirestore: (data) => {
      if (withLog) {
        writeCounter!.inc();
        writeCounter!.out();
      }
      return data as DocumentData;
    },
    fromFirestore: (snap) => {
      if (withLog) {
        readCounter!.inc();
        readCounter!.out();
      }
      return snap.data() as Data;
    },
  };

  return (db: Firestore) => {
    return db.collectionGroup(path).withConverter(converter);
  };
};
