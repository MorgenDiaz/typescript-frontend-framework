import { AxiosPromise } from "axios";
import { Observable } from "../Observable";
import { Attributes } from "./Attributes";

interface ModelAttributes<T> {
  set(value: T): void;
  getAll(): T;
  get<K extends keyof T>(key: K): T[K];
}

interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

export interface HasId {
  id?: number;
}

export abstract class Model<T extends HasId, O> extends Observable<O> {
  constructor(private sync: Sync<T>, private attributes: ModelAttributes<T>) {
    super();
  }

  get = this.attributes.get;

  getAll = this.attributes.getAll;

  set(update: T) {
    this.attributes.set(update);
    this.sync.save(this.attributes.getAll());
    this.notifyObservers();
  }

  fetch(): void {
    const id = this.attributes.get("id");

    if (typeof id !== "number") {
      throw new Error("This record doesn't exist");
    }

    (async () => {
      console.log("triggered!");
      const response = await this.sync.fetch(id);
      this.set(response.data);
    })();
  }

  protected abstract notifyObservers: () => void;
}
