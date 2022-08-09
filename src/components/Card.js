export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._cardName = data.name;
    this._cardImageLink = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const card = document
      .querySelector(this._templateSelector)
      .content.querySelector('.card')
      .cloneNode(true);
    return card;
  }

  _toggleLike() {
    this._buttonLike.classList.toggle('active');
  }
  _deleteCard() {
    this._card.remove();
  }

  _setEventListeners() {
    this._buttonLike = this._card.querySelector('.card__like-button');
    this._buttonDelete = this._card.querySelector('.card__delete-button');
    this._cardImage = this._card.querySelector('.card__image');

    this._buttonLike.addEventListener('click', () => this._toggleLike());
    this._buttonDelete.addEventListener('click', () => this._deleteCard());
    this._cardImage.addEventListener('click', () =>
      this._handleCardClick(this._cardName, this._cardImageLink),
    );
  }

  createCard() {
    this._card = this._getTemplate();
    this._setEventListeners();

    this._cardTitle = this._card.querySelector('.card__title');
    this._cardTitle.textContent = this._cardName;
    this._cardImage.alt = this._cardName;
    this._cardImage.src = this._cardImageLink;
    return this._card;
  }
}
