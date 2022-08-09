export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleOutsideClick = this._handleOutsideClick.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  _handleOutsideClick(e) {
    if (e.target === e.currentTarget) {
      this.close();
    }
  }
  _handleEscClose(e) {
    if (e.key === 'Escape') {
      this.close();
    }
  }
  open() {
    this._popup.classList.add('popup_opened');
    document.body.addEventListener('keydown', this._handleEscClose);
  }
  close() {
    this._popup.classList.remove('popup_opened');
    document.body.removeEventListener('keydown', this._handleEscClose);
  }
  setEventListeners() {
    this._popup
      .querySelector('.popup__close-button')
      .addEventListener('click', () => this.close());
    this._popup.addEventListener('mousedown', this._handleOutsideClick);
  }
}
