export const profileEditButton = document.querySelector('.profile__edit-button');
export const profileAddButton = document.querySelector('.profile__add-button');

export const formProfileEdit = document.forms['form-profile'];
export const nameInput = formProfileEdit.elements['name-input'];
export const jobInput = formProfileEdit.elements['job-input'];

export const formAddPlace = document.forms['form-addPlace'];
export const formUpdateAvatar = document.forms['form-updateAvatar'];

export const formConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};
