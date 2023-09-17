import { updateSymbol } from "./constants.js";

export class Subject {
  observers = [];

  attach(socket) {
    this.observers.push(socket);
  }

  detach(socket) {
    this.observers = this.observers.filter((s) => s !== socket);
  }

  notify() {
    this.observers.forEach((socket) => socket[updateSymbol](this));
  }
}
