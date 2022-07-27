export const profileEditButton = document.querySelector('.profile__edit-button');
export const popupCloseButtons = document.querySelectorAll('.popup__close-button');

export const popupEditProfile = document.querySelector('.popup_role_edit-profile');
export const popupAddCard = document.querySelector('.popup_role_add-card');
export const profileAddButton = document.querySelector('.profile__add-button');

export const formProfileEdit = document.forms['form-profile'];
export const nameInput = formProfileEdit.elements['name-input'];
export const jobInput = formProfileEdit.elements['job-input'];
export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__description');

export const formAddPlace = document.forms['form-addPlace'];
export const placeTitleInput = formAddPlace.elements['placeTitle-input'];
export const placeUrlInput = formAddPlace.elements['placeUrl-input'];

export const popupWithImage = document.querySelector('.popup_role_open-image');
export const popupImage = document.querySelector('.popup-image__img');
export const popupImageFigcaption = document.querySelector('.popup-image__figcaption');

export const cardsContainer = document.querySelector('.cards__list');
export const formsList = document.querySelectorAll('.popup__form');

export const formConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};
