export default class UserInfo {
  constructor(userNameSelector, userInfoSelector) {
    this._userName = document.querySelector(userNameSelector);
    this._userInfo = document.querySelector(userInfoSelector);
  }
  getUserInfo() {
    return {
      ['name-input']: this._userName.textContent,
      ['job-input']: this._userInfo.textContent,
    };
  }
  setUserInfo(newUserData) {
    this._userName.textContent = newUserData['name-input'];
    this._userInfo.textContent = newUserData['job-input'];
  }
}
