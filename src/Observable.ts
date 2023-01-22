export abstract class Observable<T> {
  protected listeners: T[] = [];

  registerListener(listener: T) {
    if (!this.listeners.includes(listener)) {
      this.listeners.push(listener);
    }
  }

  unregisterListener(listener: T) {
    this.listeners = this.listeners.filter((observer) => observer !== listener);
  }
}
