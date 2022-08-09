import './index.css';

import initialCards from '../scripts/cards.js';
import {
  profileEditButton,
  profileAddButton,
  formProfileEdit,
  nameInput,
  jobInput,
  formAddPlace,
  formConfig,
  formsList,
} from '../scripts/constants.js';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

// Принудительная генерация события инпут
const generateInputEvent = formElement => {
  const event = new Event('input');
  const inputs = formElement.querySelectorAll('.popup__input');
  inputs.forEach(input => input.dispatchEvent(event));
};

// Активация валидации форм
formsList.forEach(form => {
  const formValidator = new FormValidator(formConfig, form);
  formValidator.enableValidation();
});

// Функция открытия попапа с картинкой
const openImage = (imageTitle, imageLink) => {
  const popup = new PopupWithImage('.popup_role_open-image');
  popup.open(imageTitle, imageLink);
  popup.setEventListeners();
};

// Экземпляр класса для отрисовки начальных карточек
const cardList = new Section(
  {
    items: initialCards,
    renderer: item => {
      const card = new Card(item, '#card-template', openImage);
      const cardElement = card.createCard();
      cardList.addItem(cardElement);
    },
  },
  '.cards__list',
);

// Попап профиля
const userInfo = new UserInfo('.profile__name', '.profile__description');
const popupEditProfile = new PopupWithForm('.popup_role_edit-profile', inputValues => {
  userInfo.setUserInfo(inputValues);
});
popupEditProfile.setEventListeners();

//  Попап добавления новой карточки
const popupAddCard = new PopupWithForm('.popup_role_add-card', inputValues => {
  const placeInputsObj = {
    name: inputValues['placeTitle-input'],
    link: inputValues['placeUrl-input'],
  };
  const card = new Card(placeInputsObj, '#card-template', openImage);
  const cardElement = card.createCard();
  cardList.addItem(cardElement);
});
popupAddCard.setEventListeners();

// Открытие попапа профиля
profileEditButton.addEventListener('click', () => {
  const profileData = userInfo.getUserInfo();
  nameInput.value = profileData['name-input'];
  jobInput.value = profileData['job-input'];
  generateInputEvent(formProfileEdit);
  popupEditProfile.open();
  userInfo.setUserInfo(userInfo.getUserInfo());
});

// Открытие попапа добавления новой карточки
profileAddButton.addEventListener('click', () => {
  generateInputEvent(formAddPlace);
  popupAddCard.open();
});

// Отрисовка начальных карточек
cardList.renderItems();
