import { User } from "../models/User";
import { UserForm } from "./UsersForm";
import { UserShow } from "./UserShow";
import { View } from "./View";

export class UserEdit extends View<User> {
  regionsMap(): { [key: string]: string } {
    return {
      userShow: "#user-show",
      userForm: "#user-form",
    };
  }

  onRender(): void {
    const userShow = new UserShow(this.regions.userShow, this.model);
    const userForm = new UserForm(this.regions.userForm, this.model);

    userShow.render();
    userForm.render();
  }

  template(): string {
    return `
            <div>
                <div id="user-show"></div>
                <div id="user-form"></div>
            </div>
        `;
  }
}
