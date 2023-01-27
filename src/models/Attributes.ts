export class Attributes<T> {
  constructor(private data: T) {}

  get = <K extends keyof T>(key: K): T[K] => {
    return this.data[key];
  };

  set = (updated: T | T[keyof T] | undefined): void => {
    if (updated !== undefined && typeof this.data === "object") {
      this.data = { ...this.data, ...updated };
      console.log("set to ", this.data);
    }
  };

  getAll = (): T => {
    return this.data;
  };
}
