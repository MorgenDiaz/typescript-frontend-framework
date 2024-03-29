import { ModelObserver } from "../ModelObserver";
import { UserProps } from "../models/User";
import { Model, HasId } from "../models/Model";

export abstract class View<T extends Model<HasId>> {
  regions: { [key: string]: Element } = {};

  constructor(public parent: Element, public model: T) {
    this.bindModel();
  }

  bindModel = (): void => {
    const render = this.render;

    const observer: ModelObserver = {
      handlePropsChanged(data: UserProps) {
        render();
      },
    };

    this.model.registerListener(observer);
  };

  abstract template(): string;

  regionsMap(): { [key: string]: string } {
    return {};
  }

  eventsMap(): { [key: string]: () => void } {
    return {};
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

  mapRegions(fragment: DocumentFragment): void {
    const regionsMap = this.regionsMap();

    for (const key in regionsMap) {
      const selector = regionsMap[key];
      const element = fragment.querySelector(selector);

      if (element) {
        this.regions[key] = element;
      }
    }
  }

  onRender(): void {}

  render = (): void => {
    this.parent.innerHTML = "";

    const templateElement = document.createElement("template");
    templateElement.innerHTML = this.template();

    this.bindEvents(templateElement.content);
    this.mapRegions(templateElement.content);

    this.onRender();

    this.parent.append(templateElement.content);
  };
}
