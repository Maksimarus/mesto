const hasInvalidInput = inputList => {
  return inputList.some(input => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputList, button, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    button.setAttribute('disabled', true);
    button.classList.add(inactiveButtonClass);
  } else {
    button.removeAttribute('disabled');
    button.classList.remove(inactiveButtonClass);
  }
};

const showInputError = (form, input, errorMessage, inputErrorClass, errorClass) => {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.add(inputErrorClass);
  error.textContent = errorMessage;
  error.classList.add(errorClass);
};

const hideInputError = (form, input, inputErrorClass, errorClass) => {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.remove(inputErrorClass);
  error.classList.remove(errorClass);
  error.textContent = '';
};

const checkInputValidity = (form, input, inputErrorClass, errorClass) => {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(form, input, inputErrorClass, errorClass);
  }
};

const setEventListeners = (
  form,
  {inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass},
) => {
  const inputList = Array.from(form.querySelectorAll(inputSelector));
  const button = form.querySelector(submitButtonSelector);
  toggleButtonState(inputList, button, inactiveButtonClass);
  inputList.forEach(input => {
    input.addEventListener('input', () => {
      checkInputValidity(form, input, inputErrorClass, errorClass);
      toggleButtonState(inputList, button, inactiveButtonClass);
    });
  });
};

const enableValidation = ({formSelector, ...rest}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach(form => {
    setEventListeners(form, rest);
    form.addEventListener('submit', e => {
      e.preventDefault();
    });
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
});
