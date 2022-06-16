const profileEditButton = document.querySelector('.profile__edit-button');
const popups = document.querySelectorAll('.popup');
const popupContainer = document.querySelector('.popup__container');
const popupCloseButtons = document.querySelectorAll('.popup__close-button');

const popupEditProfile = document.querySelector('.popup_editProfile');
const popupAddPlace = document.querySelector('.popup_addPlace');
const profileAddButton = document.querySelector('.profile__add-button');

const profileEditForm = document.forms['profile-form'];
const nameInput = document.querySelector('#nameInput');
const jobInput = document.querySelector('#jobInput');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');

const addPlaceForm = document.forms['addPlace-form'];
const placeNameInput = document.querySelector('#placeNameInput');
const placeUrlInput = document.querySelector('#placeUrlInput');

const popupImage = document.querySelector('.popup-image');
const popupImageImage = document.querySelector('.popup-image__image');
const popupImageFigcaption = document.querySelector('.popup-image__figcaption');

const cardsList = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('#card-template').content;
const cardTemplateContent = cardTemplate.querySelector('.card');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

// Функция создания карточки
function createCard({ name, link }) {
  const card = cardTemplate.cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const likeButton = card.querySelector('.card__like-button');
  const deleteButton = card.querySelector('.card__delete-button');

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  cardImage.addEventListener('click', (event) => {
    popupImageImage.src = event.target.src;
    popupImageFigcaption.textContent = event.target.alt;
    popupImage.classList.add('popup_opened');
  });

  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('active');
  });

  deleteButton.addEventListener('click', (event) => {
    event.target.parentNode.remove();
  });

  cardsList.prepend(card);
}

// Рендер начальных карточек при загрузке страницы
function renderCards(array) {
  array.forEach((card) => createCard(card));
}
renderCards(initialCards);

// Открытие попапа при клике
profileEditButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  popupEditProfile.classList.add('popup_opened');
});

profileAddButton.addEventListener('click', () => {
  popupAddPlace.classList.add('popup_opened');
});

// Закрыти попапа при клике на кнопку закрыть(крестик)
function closePopup() {
  popups.forEach((popup) => {
    popup.classList.remove('popup_opened');
  });
}
popupCloseButtons.forEach((btn) => {
  btn.addEventListener('click', closePopup);
});

// Функция-обработчик отправки формы (вместо отправки - изменение информации в профиле)
function profileFormSubmitHandler(e) {
  e.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup();
}

// Функция-обработчик добавления новой карточки
function addPlaceFormSubmitHandler(e) {
  e.preventDefault();

  let placeInputsObj = {
    name: placeNameInput.value,
    link: placeUrlInput.value,
  };

  createCard(placeInputsObj);
  placeNameInput.value = '';
  placeUrlInput.value = '';
  closePopup();
}

profileEditForm.addEventListener('submit', profileFormSubmitHandler);
addPlaceForm.addEventListener('submit', addPlaceFormSubmitHandler);
