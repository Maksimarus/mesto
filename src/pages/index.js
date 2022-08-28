import './index.css';
import {
  profileEditButton,
  profileAddButton,
  formProfileEdit,
  nameInput,
  jobInput,
  formAddPlace,
  formConfig,
  formUpdateAvatar,
} from '../scripts/constants.js';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation';
import Api from '../components/Api';

// Экземпляр класса Api
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-49',
  headers: {
    authorization: 'd9f8cf7e-4e37-4ac8-b9ec-4d3eff2c0e35',
    'Content-Type': 'application/json',
  },
});

// Попап подтверждения удаления карточки
const popupDeleteCard = new PopupWithConfirmation('.popup_role_delete-card');
popupDeleteCard.setEventListeners();

// Активация валидации форм
const profileFormValidator = new FormValidator(formConfig, formProfileEdit);
profileFormValidator.enableValidation();

const addPlaceFormValidator = new FormValidator(formConfig, formAddPlace);
addPlaceFormValidator.enableValidation();

const updateAvatarFormValidator = new FormValidator(formConfig, formUpdateAvatar);
updateAvatarFormValidator.enableValidation();

// Функция открытия попапа с картинкой
const popupWithImage = new PopupWithImage('.popup_role_open-image');
popupWithImage.setEventListeners();
const openImage = (imageTitle, imageLink) => {
  popupWithImage.open(imageTitle, imageLink);
};

// Попап профиля
const userInfo = new UserInfo('.profile__name', '.profile__description', () => {
  updateAvatarFormValidator.hideErrors();
  popupUpdateAvatar.open();
});
userInfo.setEventListener();
const popupEditProfile = new PopupWithForm('.popup_role_edit-profile', inputValues => {
  const newUserData = {
    name: inputValues.nameInput,
    about: inputValues.jobInput,
  };
  popupEditProfile.setLoadingState(true);
  api
    .updateUserInfo(newUserData)
    .then(res => {
      userInfo.setUserInfo(res);
    })
    .catch(err => console.log(err))
    .finally(() => popupEditProfile.setLoadingState(false));
});
popupEditProfile.setEventListeners();

// Попап обновления аватара
const popupUpdateAvatar = new PopupWithForm('.popup_role_edit-avatar', inputValues => {
  popupUpdateAvatar.setLoadingState(true);
  api
    .updateUserAvatar(inputValues.avatarInput)
    .then(res => {
      userInfo.setUserAvatar(res.avatar);
    })
    .catch(err => console.log(err))
    .finally(() => popupUpdateAvatar.setLoadingState(false));
});
popupUpdateAvatar.setEventListeners();

// Функция создания карточки
const generateCard = obj => {
  const card = new Card(
    obj,
    '#card-template',
    openImage,
    () => {
      popupDeleteCard.open(() => {
        api.deleteCard(card.cardId).catch(err => console.log(err));
        card.deleteCard();
      });
    },
    () => {
      api
        .likeCard(card.cardId)
        .then(res => {
          card.setLikes(res.likes);
        })
        .catch(err => console.log(err));
    },
    () => {
      api
        .dislikeCard(card.cardId)
        .then(res => {
          card.setLikes(res.likes);
        })
        .catch(err => console.log(err));
    },
    userInfo.userId,
  );
  return card.createCard();
};
// Экземпляр класса для отрисовки начальных карточек
const cardList = new Section(item => {
  cardList.addItem(generateCard(item));
}, '.cards__list');

//  Попап добавления новой карточки
const popupAddCard = new PopupWithForm('.popup_role_add-card', inputValues => {
  const placeInputsObj = {
    name: inputValues.placeTitleInput,
    link: inputValues.placeUrlInput,
  };
  popupAddCard.setLoadingState(true);
  api
    .postNewCard(placeInputsObj)
    .then(res => {
      cardList.addItem(generateCard(res));
    })
    .catch(err => console.log(err))
    .finally(() => popupAddCard.setLoadingState(false));
});
popupAddCard.setEventListeners();

// Открытие попапа профиля
profileEditButton.addEventListener('click', () => {
  const profileData = userInfo.getUserInfo();
  nameInput.value = profileData.nameInput;
  jobInput.value = profileData.jobInput;
  profileFormValidator.hideErrors();
  popupEditProfile.open();
});

// Открытие попапа добавления новой карточки
profileAddButton.addEventListener('click', () => {
  addPlaceFormValidator.hideErrors();
  popupAddCard.open();
});

// Отрисовка начальных карточек и данных пользователя
api
  .getInitialData()
  .then(([user, cards]) => {
    userInfo.setUserInfo(user);
    userInfo.setUserAvatar(user.avatar);
    userInfo.setUserId(user._id);
    cardList.renderItems(cards);
  })
  .catch(err => console.log(err));
