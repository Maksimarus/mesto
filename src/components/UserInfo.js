export default class UserInfo {
  constructor(userNameSelector, userInfoSelector, openPopupHandle) {
    this._userName = document.querySelector(userNameSelector);
    this._userInfo = document.querySelector(userInfoSelector);
    this._avatar = document.querySelector('.profile__avatar-wrapper');
    this._avatarImage = document.querySelector('.profile__avatar');
    this._openPopupHandle = openPopupHandle;
  }
  getUserInfo() {
    return {
      ['name-input']: this._userName.textContent,
      ['job-input']: this._userInfo.textContent,
    };
  }
  setUserInfo(newUserData) {
    this._userName.textContent = newUserData.name;
    this._userInfo.textContent = newUserData.about;
  }
  setUserAvatar(avatarUrl) {
    this._avatarImage.src = avatarUrl;
  }
  setUserId(userId) {
    this.userId = userId;
  }
  setEventListener() {
    this._avatar.addEventListener('click', () => this._openPopupHandle());
  }
}
