import { Subject } from "./subject.js";

/**
 * what's a way to abstract the notify() calls inside Timer's methods?
 */
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
    this.notify();
    this.timerId = setInterval(() => this.tick(), 1000);
  }

  tick() {
    this.elapsed += 1;
    this.notify();
    if (this.elapsed >= this.duration) {
      this.pause();
    }
  }

  pause() {
    if (this.status === "paused") return;
    this.status = "paused";
    this.notify();
    clearInterval(this.timerId);
    this.timerId = null;
  }

  reset() {
    this.elapsed = 0;
    this.notify();
  }
}
