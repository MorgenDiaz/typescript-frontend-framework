import { User } from "./models/User";
import { UserObserver } from "./UserObserver";

const user = new User({ name: "Lilia", age: 21 });

const userObserver: UserObserver = {
  handleUserDataChanged(data) {
    alert(data.name);
  },
};

user.registerListener(userObserver);
user.save();

user.fetch();
