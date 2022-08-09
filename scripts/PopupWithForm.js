import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitFunc) {
    super(popupSelector);
    this._submitFunc = submitFunc;
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = this._form.querySelectorAll('.popup__input');
  }
  _getInputValues() {
    const inputValues = [...this._inputs].reduce((acc, input) => {
      acc[input.name] = input.value;
      return acc;
    }, {});
    return inputValues;
  }
  close() {
    super.close();
    this._form.reset();
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', e => {
      e.preventDefault();
      this._submitFunc(this._getInputValues());
      this.close();
    });
  }
}
