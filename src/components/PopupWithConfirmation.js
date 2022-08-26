import Popup from './Popup';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._button = this._form.querySelector('.popup__button');
    this.open = super.open.bind(this);
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', e => {
      e.preventDefault();
      this._submitFunc();
      this.close();
    });
  }
  setSubmitFunc(submitFunc) {
    this._submitFunc = submitFunc;
  }
}
