const profileEditButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupContainer = document.querySelector('.popup__container');
const popupCloseButton = document.querySelector('.popup__close-button');

const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('#nameInput');
const jobInput = document.querySelector('#jobInput');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');

function closePopup() {
  popup.classList.remove('popup_opened');
}

// Открытие попапа при клике на кнопку изменения
profileEditButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  popup.classList.add('popup_opened');
});

// Закрыти попапа при клике на кнопку закрыть(крестик)
popupCloseButton.addEventListener('click', () => {
  closePopup();
});

// Функция-обработчик отправки формы (вместо отправки - изменение информации в профиле)
function formSubmitHandler(e) {
  e.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);
