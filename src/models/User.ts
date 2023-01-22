import axios, { AxiosResponse } from "axios";
import { Observable } from "../Observable";
import { UserObserver } from "../UserObserver";
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

  constructor(private data: UserProps) {
    super();
  }

  notifyObservers() {
    for (let listener of this.listeners) {
      listener.handleUserDataChanged(this.data);
    }
  }

  get(prop: string): number | string {
    return this.data[prop];
  }

  set(updated: UserProps) {
    Object.assign(this.data, updated);
    this.notifyObservers();
  }
}
