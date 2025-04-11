import Popup from '@components/Popup';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, callbackSubmit) {
    super(popupSelector);
    this.popupForm = this.popup.querySelector('.popup__form');
    this._callbackSubmit = callbackSubmit;
    this._inputList = Array.from(this.popupForm.querySelectorAll('.form__input'));
    this._formValues = {};
    this._submitButton = this.popupForm.querySelector('.form__save-button');
    this.setEventListeners();
  }

  _getInputValues() {
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }

  setEventListeners() {
    this.popupForm.addEventListener('submit', () => {
      this._callbackSubmit(this._getInputValues(), this._submitButton, this._data)
    })
  }

  open(data) {
    super.open();
    this._data = data;
  }

  close() {
    this.popupForm.reset();
    super.close();
  }
}
