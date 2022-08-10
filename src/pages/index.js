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
} from '../scripts/constants.js';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

// Активация валидации форм
const profileFormValidator = new FormValidator(formConfig, formProfileEdit);
profileFormValidator.enableValidation();

const addPlaceFormValidator = new FormValidator(formConfig, formAddPlace);
addPlaceFormValidator.enableValidation();

// Функция открытия попапа с картинкой
const popupWithImage = new PopupWithImage('.popup_role_open-image');
popupWithImage.setEventListeners();
const openImage = (imageTitle, imageLink) => {
  popupWithImage.open(imageTitle, imageLink);
};

// Функция создания карточки
const generateCard = obj => {
  const card = new Card(obj, '#card-template', openImage);
  return card.createCard();
};

// Экземпляр класса для отрисовки начальных карточек
const cardList = new Section(
  {
    items: initialCards,
    renderer: item => {
      cardList.addItem(generateCard(item));
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
  cardList.addItem(generateCard(placeInputsObj));
});
popupAddCard.setEventListeners();

// Открытие попапа профиля
profileEditButton.addEventListener('click', () => {
  const profileData = userInfo.getUserInfo();
  nameInput.value = profileData['name-input'];
  jobInput.value = profileData['job-input'];
  profileFormValidator.hideErrors();
  popupEditProfile.open();
});

// Открытие попапа добавления новой карточки
profileAddButton.addEventListener('click', () => {
  addPlaceFormValidator.hideErrors();
  popupAddCard.open();
});

// Отрисовка начальных карточек
cardList.renderItems();
