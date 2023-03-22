import { HasId } from "./models/Model";
export interface ModelObserver {
  handlePropsChanged(data: HasId): void;
}
