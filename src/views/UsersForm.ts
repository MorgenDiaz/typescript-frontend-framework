import { User } from "../models/User";
import { UserObserver } from "../UserObserver";
import { UserProps } from "../models/User";

export class UserForm {
  constructor(public parent: Element, public model: User) {
    this.bindModel();
  }

  bindModel = (): void => {
    const render = this.render;

    const userObserver: UserObserver = {
      handleUserDataChanged(data: UserProps) {
        alert(`quah chuh! ${data.name}`);
        alert("should render!!1");
        render();
      },
    };

    this.model.registerListener(userObserver);
  };

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
                <h1>User Form</h1>
                <div>User name: ${this.model.get("name")}</div>
                <div>User age: ${this.model.get("age")}</div>

                <input />
                <button id="set-name">Change Name</button>
                <button id="set-age">Set Random Age</button>
            </div>
        `;
  }

  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();

    for (const eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(":");

      const elements = fragment.querySelectorAll(selector);
      for (const element of elements) {
        element.addEventListener(eventName, eventsMap[eventKey]);
      }
    }
  }

  render = (): void => {
    this.parent.innerHTML = "";

    const templateElement = document.createElement("template");
    templateElement.innerHTML = this.template();

    this.bindEvents(templateElement.content);

    this.parent.append(templateElement.content);
  };
}
