// Принудительная генерация события инпут
function generateInputEvent(formElement) {
  const event = new Event('input');
  const inputs = formElement.querySelectorAll('.popup__input');
  inputs.forEach(input => input.dispatchEvent(event));
}

// Закрыти попапа кликом на оверлей
function closePopupOnOutsideClick(e) {
  const path = e.path || (e.composedPath && e.composedPath());
  if (path[0] === e.target.closest('.popup')) {
    closePopup();
  }
}

// Закрыти попапа нажатием на ESC
function closePopupOnPressEsc(e) {
  if (e.key === 'Escape') {
    closePopup();
  }
}

// Функция открытия попапа
function openPopup(elem) {
  elem.classList.add('popup_opened');
  elem.addEventListener('mousedown', closePopupOnOutsideClick);
  document.body.addEventListener('keydown', closePopupOnPressEsc);
}

function openImage(e) {
  popupImageImg.src = e.target.src;
  popupImageImg.alt = e.target.alt;
  popupImageFigcaption.textContent = e.target.alt;
  openPopup(popupImage);
}

function toggleLike(btn) {
  btn.classList.toggle('active');
}

function deleteCard(e) {
  const card = e.target.closest('.card');
  card.remove();
}

// Функция создания карточки
function createCard({name, link}) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const likeButton = card.querySelector('.card__like-button');
  const deleteButton = card.querySelector('.card__delete-button');

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  cardImage.addEventListener('click', e => {
    openImage(e);
  });

  likeButton.addEventListener('click', () => {
    toggleLike(likeButton);
  });

  deleteButton.addEventListener('click', e => {
    deleteCard(e);
  });
  return card;
}

// Отрисовка карточки
function renderCard(obj) {
  const card = createCard(obj);
  cardsList.prepend(card);
}

// Отрисовка начальных карточек при загрузке страницы
initialCards.forEach(card => renderCard(card));

// Открытие попапа при клике
profileEditButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  generateInputEvent(profileEditForm);
  openPopup(popupEditProfile);
});

profileAddButton.addEventListener('click', () => {
  generateInputEvent(addPlaceForm);
  openPopup(popupAddCard);
});

// Закрыти попапа при клике на кнопку закрыть(крестик)
function closePopup() {
  popups.forEach(popup => {
    popup.classList.remove('popup_opened');
    popup.addEventListener('click', closePopupOnOutsideClick);
    document.body.removeEventListener('keydown', closePopupOnPressEsc);
  });
}
popupCloseButtons.forEach(btn => {
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
    name: placeTitleInput.value,
    link: placeUrlInput.value,
  };

  renderCard(placeInputsObj);
  e.target.reset();
  closePopup();
}

profileEditForm.addEventListener('submit', profileFormSubmitHandler);
addPlaceForm.addEventListener('submit', addPlaceFormSubmitHandler);
