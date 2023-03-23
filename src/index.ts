import { CollectionObserver } from "./models/Collection";
import { User } from "./models/User";
import { UserEdit } from "./views/UserEdit";
import { UserList } from "./views/UserList";

const users = User.buildUserCollection();

const collectionObserver: CollectionObserver = {
  onUpdate() {
    const root = document.getElementById("root");

    if (root) {
      const usersView = new UserList(root, users);
      usersView.render();
    } else {
      throw new Error("Root element not found.");
    }
  },
};

users.registerListener(collectionObserver);
users.fetch();
