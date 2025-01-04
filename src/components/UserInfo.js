export default class UserInfo {
  constructor({avatarSelector, nameSelector, bioSelector}) {
    this._avatar = document.querySelector(avatarSelector);
    this._name = document.querySelector(nameSelector);
    this._bio = document.querySelector(bioSelector);
    this.userId;
  }

  setUserObject(data) {
    this._userData = data;
  }

  getUserObject() {
    return this._userData;
  }

  _setUserId(user) {
    this.userId = user.id;
  }

  setUserInfo(inputs) {
    this._name.textContent = inputs.name;
    this._bio.textContent = inputs.bio;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      bio: this._bio.textContent
    }
  }

  setUserAvatar(input) {
    this._avatar.src = input.avatar;
  }

  renderUserInfo(data) {
    this.setUserObject(data);
    this.setUserInfo(data);
    this.setUserAvatar(data);
    this._setUserId(data);
  }
}
