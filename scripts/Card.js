import {openImage} from './index.js';

export default class Card {
  constructor(data, templateSelector) {
    this._cardName = data.name;
    this._cardImage = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const card = document
      .querySelector(this._templateSelector)
      .content.querySelector('.card')
      .cloneNode(true);
    return card;
  }

  _toggleLike(likeButton) {
    likeButton.classList.toggle('active');
  }
  _deleteCard(e) {
    const card = e.target.closest('.card');
    card.remove();
  }

  _setEventListeners() {
    const likeButton = this._card.querySelector('.card__like-button');
    const deleteButton = this._card.querySelector('.card__delete-button');
    const cardImage = this._card.querySelector('.card__image');
    likeButton.addEventListener('click', () => {
      this._toggleLike(likeButton);
    });
    deleteButton.addEventListener('click', e => {
      this._deleteCard(e);
    });
    cardImage.addEventListener('click', e => {
      openImage(e);
    });
  }

  createCard() {
    this._card = this._getTemplate();
    this._setEventListeners();
    const cardImage = this._card.querySelector('.card__image');
    const cardTitle = this._card.querySelector('.card__title');
    cardTitle.textContent = this._cardName;
    cardImage.alt = this._cardName;
    cardImage.src = this._cardImage;
    return this._card;
  }
}
