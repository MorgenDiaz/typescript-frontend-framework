import axios, { AxiosResponse } from "axios";
import { UserObserver } from "../UserObserver";
import { Attributes } from "./Attributes";
import { Model } from "./Model";
import { ApiSync } from "./ApiSync";
import { Collection } from "./Collection";

export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

export class User extends Model<UserProps, UserObserver> {
  constructor(data: UserProps) {
    const sync = new ApiSync("http://localhost:3000/users");
    const attributes = new Attributes<UserProps>(data);

    super(sync, attributes);
  }

  protected notifyObservers = () => {
    for (let listener of this.listeners) {
      listener.handleUserDataChanged(this.getAll());
    }
  };

  static buildUserCollection(): Collection<User, UserProps> {
    return new Collection<User, UserProps>(
      "http://localhost:3000/users",
      (jsonUser) => new User(jsonUser)
    );
  }

  setRandomAge(): void {
    const age = Math.round(Math.random() * 100);
    this.set({ age });
  }
}
