import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup-image__img');
    this._figcaption = document.querySelector('.popup-image__figcaption');
  }

  open(imageTitle, imageLink) {
    this._image.src = imageLink;
    this._image.alt = imageTitle;
    this._figcaption.textContent = imageTitle;
    super.open();
  }
}
