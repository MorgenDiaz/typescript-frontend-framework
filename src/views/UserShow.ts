import { User } from "../models/User";
import { View } from "./View";
export class UserShow extends View<User> {
  template(): string {
    return `
            <div>
                <h1>User Info</h1>
                <div>User Name: ${this.model.get("name")}</div>
                <div>User Age: ${this.model.get("age")}</div>
            </div>
        `;
  }
}
