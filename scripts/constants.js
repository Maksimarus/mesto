export const profileEditButton = document.querySelector('.profile__edit-button');
export const popups = document.querySelectorAll('.popup');
export const popupCloseButtons = document.querySelectorAll('.popup__close-button');

export const popupEditProfile = document.querySelector('.popup_role_edit-profile');
export const popupAddCard = document.querySelector('.popup_role_add-card');
export const profileAddButton = document.querySelector('.profile__add-button');

export const profileEditForm = document.forms['profile-form'];
export const nameInput = profileEditForm.elements['name-input'];
export const jobInput = profileEditForm.elements['job-input'];
export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__description');

export const addPlaceForm = document.forms['addPlace-form'];
export const placeTitleInput = addPlaceForm.elements['placeTitle-input'];
export const placeUrlInput = addPlaceForm.elements['placeUrl-input'];

export const popupImage = document.querySelector('.popup_role_open-image');
export const popupImageImg = document.querySelector('.popup-image__img');
export const popupImageFigcaption = document.querySelector('.popup-image__figcaption');

export const cardsList = document.querySelector('.cards__list');
export const formsList = document.querySelectorAll('.popup__form');

export const formConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};
