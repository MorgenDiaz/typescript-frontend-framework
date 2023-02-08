import axios, { AxiosResponse } from "axios";
import { UserObserver } from "../UserObserver";
import { Attributes } from "./Attributes";
import { Model } from "./Model";
import { ApiSync } from "./ApiSync";

export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

export class User extends Model<UserProps, UserObserver> {
  constructor(data: UserProps) {
    const sync = new ApiSync("https://localhost:3000/users");
    const attributes = new Attributes<UserProps>(data);

    super(sync, attributes);
  }

  protected notifyObservers = () => {
    for (let listener of this.listeners) {
      listener.handleUserDataChanged(this.getAll());
    }
  };
}
