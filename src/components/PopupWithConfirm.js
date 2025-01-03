import Popup from '@components/Popup';

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, callbackSubmit) {
    super(popupSelector);
    this.popupForm = this.popup.querySelector('.popup__form');
    this._callbackSubmit = callbackSubmit;
    this._submitButton = this.popupForm.querySelector('.form__save-button');
    this.setEventListeners();
  }

  open(data) {
    super.open();
    this._data = data;
  }

  setEventListeners() {
    this.popupForm.addEventListener('submit', () => {
      this._callbackSubmit(this._data, this._submitButton)
    })
  }
}
