import initialCards from './cards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {
  profileEditButton,
  popupCloseButtons,
  popupEditProfile,
  popupAddCard,
  profileAddButton,
  formProfileEdit,
  nameInput,
  jobInput,
  profileName,
  profileJob,
  formAddPlace,
  placeTitleInput,
  placeUrlInput,
  popupWithImage,
  popupImage,
  popupImageFigcaption,
  cardsContainer,
  formConfig,
  formsList,
} from './constants.js';

// Активация валидации форм
formsList.forEach(form => {
  const formValidator = new FormValidator(formConfig, form);
  formValidator.enableValidation();
});

// Принудительная генерация события инпут
function generateInputEvent(formElement) {
  const event = new Event('input');
  const inputs = formElement.querySelectorAll('.popup__input');
  inputs.forEach(input => input.dispatchEvent(event));
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('mousedown', closePopupOnOutsideClick);
  document.body.removeEventListener('keydown', closePopupOnPressEsc);
}

// Закрыти попапа кликом на оверлей
function closePopupOnOutsideClick(e, popup) {
  if (e.target === e.currentTarget) {
    closePopup(popup);
  }
}

// Закрыти попапа нажатием на ESC
function closePopupOnPressEsc(e, popup) {
  if (e.key === 'Escape') {
    closePopup(popup);
  }
}

// Функция открытия попапа
function openPopup(elem) {
  elem.classList.add('popup_opened');
  elem.addEventListener('mousedown', e => closePopupOnOutsideClick(e, elem));
  document.body.addEventListener('keydown', e => closePopupOnPressEsc(e, elem));
}

export function openImage(imageTitle, imageLink) {
  popupImage.src = imageLink;
  popupImage.alt = imageTitle;
  popupImageFigcaption.textContent = imageTitle;
  openPopup(popupWithImage);
}

// Отрисовка карточки
function renderCard(obj) {
  const card = new Card(obj, '#card-template');
  const cardElement = card.createCard();
  cardsContainer.prepend(cardElement);
}

// Отрисовка начальных карточек при загрузке страницы
initialCards.forEach(card => renderCard(card));

// Открытие попапа при клике
profileEditButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  generateInputEvent(formProfileEdit);
  openPopup(popupEditProfile);
});

profileAddButton.addEventListener('click', () => {
  generateInputEvent(formAddPlace);
  openPopup(popupAddCard);
});

// Закрыти попапа при клике на кнопку закрыть(крестик)
popupCloseButtons.forEach(btn => {
  const popup = btn.closest('.popup');
  btn.addEventListener('click', () => closePopup(popup));
});

// Функция-обработчик отправки формы (вместо отправки - изменение информации в профиле)
function formProfileSubmitHandler(e) {
  e.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(e.target.closest('.popup'));
}

// Функция-обработчик добавления новой карточки
function formAddPlaceSubmitHandler(e) {
  e.preventDefault();

  const placeInputsObj = {
    name: placeTitleInput.value,
    link: placeUrlInput.value,
  };

  renderCard(placeInputsObj);
  e.target.reset();
  closePopup(e.target.closest('.popup'));
}

formProfileEdit.addEventListener('submit', formProfileSubmitHandler);
formAddPlace.addEventListener('submit', formAddPlaceSubmitHandler);
