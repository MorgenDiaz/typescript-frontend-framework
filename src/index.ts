import { User } from "./models/User";
import { UserObserver } from "./UserObserver";

const user = new User({ id: 1, name: "Lilia", age: 97 });

const userObserver: UserObserver = {
  handleUserDataChanged(data) {
    alert(data.name);
  },
};

user.registerListener(userObserver);

console.log(user.get("name"));
user.set({ name: "morgen" });
//user.save();

user.fetch();
