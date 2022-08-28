export default class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    handleDeleteBtnClick,
    likeBtnHandler,
    dislikeBtnHandler,
    userId,
  ) {
    this._cardName = data.name;
    this._cardImageLink = data.link;
    this._likesCountArray = data.likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteBtnClick = handleDeleteBtnClick;
    this._likeBtnHandler = likeBtnHandler;
    this._dislikeBtnHandler = dislikeBtnHandler;

    this.cardId = data._id;
    this._ownerId = data.owner._id;
    this._currentUserId = userId;
  }

  _getTemplate() {
    const card = document
      .querySelector(this._templateSelector)
      .content.querySelector('.card')
      .cloneNode(true);
    return card;
  }

  _checkMyLike() {
    return this._likesCountArray.some(user => user._id === this._currentUserId);
  }
  _setLikeState() {
    this._likesCountElement.textContent = this._likesCountArray.length;
    this._checkMyLike()
      ? this._buttonLike.classList.add('active')
      : this._buttonLike.classList.remove('active');
  }
  setLikes(payload) {
    this._likesCountArray = payload;
    this._setLikeState();
  }
  _toggleLike() {
    if (this._buttonLike.classList.contains('active')) {
      this._dislikeBtnHandler();
    } else {
      this._likeBtnHandler();
    }
  }

  deleteCard = () => {
    this._card.remove();
    this._card = null;
  };
  _setEventListeners() {
    this._buttonLike = this._card.querySelector('.card__like-button');
    this._buttonDelete = this._card.querySelector('.card__delete-button');
    this._cardImage = this._card.querySelector('.card__image');
    this._buttonLike.addEventListener('click', () => this._toggleLike());
    this._buttonDelete.addEventListener('click', () => this._handleDeleteBtnClick());
    this._cardImage.addEventListener('click', () =>
      this._handleCardClick(this._cardName, this._cardImageLink),
    );
  }
  _checkMyCards() {
    this._likesCountElement = this._card.querySelector('.card__like-count');
    this._setLikeState();
    if (this._ownerId !== this._currentUserId) {
      this._buttonDelete.classList.add('none');
    }
  }
  createCard() {
    this._card = this._getTemplate();
    this._setEventListeners();
    this._checkMyCards();

    this._cardTitle = this._card.querySelector('.card__title');
    this._cardTitle.textContent = this._cardName;
    this._cardImage.alt = this._cardName;
    this._cardImage.src = this._cardImageLink;
    return this._card;
  }
}
