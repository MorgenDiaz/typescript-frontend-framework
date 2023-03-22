import { CollectionObserver } from "./models/Collection";
import { User, UserProps } from "./models/User";
import { UserObserver } from "./UserObserver";
import { UserForm } from "./views/UsersForm";

const users = User.buildUserCollection();

const collectionObserver: CollectionObserver = {
  onUpdate() {
    console.log(users.models);
    users.models[0].set({ name: "Quagmire!" });

    const root = document.getElementById("root");

    if (root) {
      const userForm = new UserForm(root, users.models[0]);
      userForm.render();
    } else {
      throw new Error("Root element not found.");
    }
  },
};

users.registerListener(collectionObserver);
users.fetch();
