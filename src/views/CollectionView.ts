import { Collection, CollectionObserver } from "../models/Collection";
import { HasId, Model } from "../models/Model";
import { View } from "./View";

export abstract class CollectionView<T extends Model<S>, S extends HasId> {
  constructor(public parent: Element, public collection: Collection<T, S>) {}

  abstract renderItem(model: T, itemParent: Element): void;

  render() {
    this.parent.innerHTML = "";
    const templateElement = document.createElement("template");

    for (const model of this.collection.models) {
      const itemParent = document.createElement("div");
      this.renderItem(model, itemParent);
      templateElement.content.append(itemParent);
    }

    this.parent.append(templateElement.content);
  }
}
