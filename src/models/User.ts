import axios, { AxiosResponse } from "axios";
import { Observable } from "../Observable";
import { UserObserver } from "../UserObserver";

export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

export class User extends Observable<UserObserver> {
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

  async fetch(): void {
    const response: AxiosResponse = await axios.get(
      `http://localhost:3000/users/${this.get("id")}`
    );

    this.set(response.data);
  }

  async save(): void {
    const id = this.get("id");
    if (id) {
      axios.put(`http://localhost:3000/users/${id}`, this.data);
    } else {
      axios.post(`http://localhost:3000/users`, this.data);
    }
  }
}
