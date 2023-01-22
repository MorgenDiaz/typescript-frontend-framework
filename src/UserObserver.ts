import { UserProps } from "./models/User";

export interface UserObserver {
  handleUserDataChanged(data: UserProps): void;
}
