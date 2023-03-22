import { CollectionObserver } from "./models/Collection";
import { User, UserProps } from "./models/User";
import { UserObserver } from "./ModelObserver";
import { UserEdit } from "./views/UserEdit";
const users = User.buildUserCollection();

const collectionObserver: CollectionObserver = {
  onUpdate() {
    console.log(users.models);
    users.models[0].set({ name: "Quagmire!" });

    const root = document.getElementById("root");

    if (root) {
      const userEdit = new UserEdit(root, users.models[0]);
      userEdit.render();
    } else {
      throw new Error("Root element not found.");
    }
  },
};

users.registerListener(collectionObserver);
users.fetch();
