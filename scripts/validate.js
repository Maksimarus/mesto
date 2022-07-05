function enableValidation(obj) {}
// включение валидации вызовом enableValidation
// все настройки передаются при вызове

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
});

// TODO: обращение к полям формы
// function setSubmitButtonState(isFormValid) {
//   if(isFormValid) {
//   addButton.removeAttribute('disabled');
//   addButton.classList.remove('input__btn_disabled');
// setSubmitButtonState(false);
//   } else {
//   addButton.setAttribute('disabled', true);
//   addButton.classList.add('input__btn_disabled');
//   }
// }

// form.addEventListener('submit', function (evt) {
//   evt.preventDefault();
//   addSong(artist.value, title.value);
//   artist.value = '';
//   title.value = '';
// });

// form.addEventListener('input', (evt) => {
//   const isValid = artist.value.length > 0 && title.value.length > 0;
//   setSubmitButtonState(isValid)
// })
