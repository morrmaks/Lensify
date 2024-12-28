export default class FormValidator {
  constructor(config, form) {
    this._form = form;
    this._config = config;
    this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
    this._submitButton = this._form.querySelector(this._config.submitButtonSelector);
  }

  _switchButtonState() {
    const isFormValid = this._form.checkValidity();
    this._submitButton.classList.toggle(this._config.inactiveSubmitButtonSelector, !isFormValid);
    this._submitButton.disabled = !isFormValid;
  }

  _showInputError = inputElement => {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._config.formErrorVisibleSelector);
  }

  _hideInputError = inputElement => {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorSelector);
    errorElement.textContent = '';
    errorElement.classList.remove(this._config.formErrorVisibleSelector);
  }

  _checkInputValidity = inputElement => {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement);
    }
  }

  _setEventListeners() {
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._switchButtonState();
      })
    })
  }

  resetValidation() {
    this._switchButtonState();
    this._inputList.forEach(inputElement =>
      this._hideInputError(inputElement)
    )
  }

  enableValidation() {
    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}
