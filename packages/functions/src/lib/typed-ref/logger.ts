abstract class Counter {
  static _id = 0;

  id: string;
  name: string;
  count = 0;
  constructor(name: string) {
    this.id = (ReadCounter._id++).toString();
    this.name = name;
  }
  inc() {
    this.count++;
  }
  abstract out(): void;
  log() {
    this.inc();
    this.out();
  }
}

export class ReadCounter extends Counter {
  constructor(name: string) {
    super(name);
  }
  out() {
    console.log(`${this.name}`.padEnd(30, " "), `read doc : ${this.count}`);
  }
}

export class WriteCounter extends Counter {
  constructor(name: string) {
    super(name);
  }
  out() {
    console.log(`${this.name}`.padEnd(30, " "), `write doc : ${this.count}`);
  }
}
