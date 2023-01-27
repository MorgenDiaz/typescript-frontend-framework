import axios, { AxiosResponse } from "axios";
import { Observable } from "../Observable";
import { UserObserver } from "../UserObserver";
import { Attributes } from "./Attributes";
import { Sync } from "./Sync";

export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

export class User extends Observable<UserObserver> {
  private sync: Sync<UserProps> = new Sync<UserProps>(
    "http://localhost:3000/users"
  );

  private attributes: Attributes<UserProps>;

  constructor(private data: UserProps) {
    super();
    this.attributes = new Attributes<UserProps>(data);
  }

  get get() {
    return this.attributes.get;
  }

  set(update: UserProps) {
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

  private notifyObservers() {
    for (let listener of this.listeners) {
      listener.handleUserDataChanged(this.attributes.getAll());
    }
  }
}
