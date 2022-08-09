export default class FormValidator {
  constructor(config, form) {
    this._form = form;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
  }

  _hasInvalidInput() {
    return this._inputList.some(input => {
      return !input.validity.valid;
    });
  }

  _toggleButtonState() {
    const button = this._form.querySelector(this._submitButtonSelector);
    if (this._hasInvalidInput()) {
      button.setAttribute('disabled', true);
      button.classList.add(this._inactiveButtonClass);
    } else {
      button.removeAttribute('disabled');
      button.classList.remove(this._inactiveButtonClass);
    }
  }

  _showInputError(input, errorMessage) {
    const error = this._form.querySelector(`.${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    error.textContent = errorMessage;
    error.classList.add(this._errorClass);
  }

  _hideInputError(input) {
    const error = this._form.querySelector(`.${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    error.classList.remove(this._errorClass);
    error.textContent = '';
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  }

  _setEventListeners() {
    this._inputList = [...this._form.querySelectorAll(this._inputSelector)];
    this._toggleButtonState();
    this._inputList.forEach(input => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }

  hideErrors() {
    this._inputList.forEach(input => this._hideInputError(input));
    this._toggleButtonState();
  }

  enableValidation() {
    this._setEventListeners();
    this._form.addEventListener('submit', e => {
      e.preventDefault();
    });
  }
}
