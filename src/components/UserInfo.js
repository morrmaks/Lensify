export default class UserInfo {
  constructor({avatarSelector, nameSelector, bioSelector}) {
    this._avatar = document.querySelector(avatarSelector);
    this._name = document.querySelector(nameSelector);
    this._bio = document.querySelector(bioSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      bio: this._bio.textContent
    }
  }

  setUserInfo(inputs) {
    this._name.textContent = inputs.name;
    this._bio.textContent = inputs.bio;
  }

  setUserAvatar(input) {
    this._avatar.src = input.avatar;
  }
}
