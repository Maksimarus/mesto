const profileEditButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupContainer = document.querySelector('.popup__container');
const popupCloseButton = document.querySelector('.popup__close-button');

// Открытие попапа при клике на кнопку изменения
profileEditButton.addEventListener('click', () => {
  popup.classList.add('popup_opened');
})

// Закрыти попапа при клике на кнопку закрыть(крестик)
popupCloseButton.addEventListener('click', () => {
  popup.classList.remove('popup_opened');
})

// Закрытие попапа при клике на область вне самого попапа
popup.addEventListener('click', (e) => {
  const path = e.path || (e.composedPath && e.composedPath());
  if (!path.includes(popupContainer)) {
    popup.classList.remove('popup_opened');
  }
})

// Реализуем редактирование информации о себе через форму
const formElement = document.querySelector('.popup__form');

// Функция-обработчик отправки формы (вместо отправки - изменение информации в профиле)
function formSubmitHandler (e) {
	e.preventDefault();

	const nameInput = document.querySelector('#nameInput');
	const jobInput = document.querySelector('#jobInput');

  const profileName = document.querySelector('.profile__name');
  const profileJob = document.querySelector('.profile__description');

	profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);