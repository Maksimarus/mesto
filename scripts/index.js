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

const popupImage = document.querySelector('.popup_image');
const popupImageImg = document.querySelector('.popup-image__img');
const popupImageFigcaption = document.querySelector('.popup-image__figcaption');

const cardsList = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('#card-template').content;

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

// Функция открытия попапа
function openPopup(elem) {
  elem.classList.add('popup_opened');
}

function openImage(event) {
  popupImageImg.src = event.target.src;
  popupImageFigcaption.textContent = event.target.alt;
  openPopup(popupImage);
}

function toggleLike(btn) {
  btn.classList.toggle('active');
}

function deleteCard(event) {
  const card = event.target.closest('.card');
  card.remove();
}

// Функция создания карточки
function createCard({ name, link }) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const likeButton = card.querySelector('.card__like-button');
  const deleteButton = card.querySelector('.card__delete-button');

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  cardImage.addEventListener('click', (event) => {
    openImage(event);
  });

  likeButton.addEventListener('click', () => {
    toggleLike(likeButton);
  });

  deleteButton.addEventListener('click', (event) => {
    deleteCard(event);
  });
  return card;
}

// Отрисовка карточки
function renderCard(obj) {
  const card = createCard(obj);
  cardsList.prepend(card);
}

// Отрисовка начальных карточек при загрузке страницы
initialCards.forEach((card) => renderCard(card));

// Открытие попапа при клике
profileEditButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupEditProfile);
});

profileAddButton.addEventListener('click', () => {
  openPopup(popupAddPlace);
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

  const placeInputsObj = {
    name: placeNameInput.value,
    link: placeUrlInput.value,
  };

  renderCard(placeInputsObj);
  placeNameInput.value = '';
  placeUrlInput.value = '';
  closePopup();
}

profileEditForm.addEventListener('submit', profileFormSubmitHandler);
addPlaceForm.addEventListener('submit', addPlaceFormSubmitHandler);
