import { Collection, CollectionObserver } from "./models/Collection";
import { User, UserProps } from "./models/User";
import { UserObserver } from "./UserObserver";

const collectionObserver: CollectionObserver = {
  onUpdate() {
    console.log(users.models);
    users.models[0].registerListener(userObserver);
    users.models[0].set({ name: "Quagmire!" });
  },
};

const userObserver: UserObserver = {
  handleUserDataChanged(data: UserProps) {
    alert(`quah chuh! ${data.name}`);
  },
};

const users = new Collection<User, UserProps>(
  "http://localhost:3000/users",
  (jsonUser) => new User(jsonUser)
);

users.registerListener(collectionObserver);
users.fetch();
