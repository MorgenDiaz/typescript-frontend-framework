import axios from "axios";
import { Observable } from "../Observable";
import { HasId, Model } from "./Model";

export interface CollectionObserver {
  onUpdate(): void;
}

export class Collection<
  T,
  S extends HasId
> extends Observable<CollectionObserver> {
  models: T[] = [];

  constructor(public rootUrl: string, public deserialize: (json: S) => T) {
    super();
  }

  fetch: () => void = () => {
    (async () => {
      const response = await axios.get(this.rootUrl);
      const data = response.data;

      this.models = data.map((record: S) => {
        return this.deserialize(record);
      });

      this.notifyObservers();
    })();
  };

  private notifyObservers() {
    for (let listener of this.listeners) {
      listener.onUpdate();
    }
  }
}
