import { Subject } from "./subject.js";

export class Timer extends Subject {
  status = "paused";
  timerId = null;
  duration;
  elapsed;

  constructor(duration = 120, elapsed = 0) {
    super();
    this.duration = duration;
    this.elapsed = elapsed;
  }

  start() {
    if (this.status === "running" || this.elapsed >= this.duration) return;
    this.status = "running";
    this.timerId = setInterval(() => this.tick(), 1000);
  }

  tick() {
    this.elapsed += 1;
    if (this.elapsed >= this.duration) {
      this.pause();
    }
    this.notify();
  }

  pause() {
    if (this.status === "paused") return;
    this.status = "paused";
    clearInterval(this.timerId);
    this.timerId = null;
  }

  reset() {
    this.elapsed = 0;
  }
}
