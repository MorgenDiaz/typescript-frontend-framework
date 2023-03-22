import { User } from "../models/User";
import { View } from "./View";

export class UserForm extends View<User> {
  onSetAgeClick = (): void => {
    this.model.setRandomAge();
  };

  onSetNameClick = (): void => {
    const input = this.parent.querySelector("input");

    if (input) {
      const name = input?.value;
      this.model.set({ name });
    }
  };

  eventsMap(): { [key: string]: () => void } {
    return {
      "click:#set-age": this.onSetAgeClick,
      "click:#set-name": this.onSetNameClick,
    };
  }

  template(): string {
    return `
            <div>
                <input placeholder="${this.model.get("name")}"/>
                <button id="set-name">Change Name</button>
                <button id="set-age">Set Random Age</button>
            </div>
        `;
  }
}
