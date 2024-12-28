export default class Popup {
  constructor(popupSelector) {
    this.popup = document.querySelector(popupSelector);
    this._handleClickEsc = this._handleClickEsc.bind(this);
    this._handleCloseEvent = this._handleCloseEvent.bind(this);
  }

  open() {
    this.popup.classList.add('popup__opened');
    document.addEventListener('keydown', this._handleClickEsc);
    this.popup.addEventListener('mousedown', this._handleCloseEvent);
  }

  close() {
    this.popup.classList.remove('popup__opened');
    document.removeEventListener('keydown', this._handleClickEsc); // именнованная функция, что бы можно было удалить слушатель
    this.popup.removeEventListener('mousedown', this._handleCloseEvent);
  }

  _handleClickEsc(evt) {
    if (evt.key === "Escape") {
      this.close();
    };
  }

  _handleCloseEvent(evt) {
    if (
      evt.target.classList.contains('popup__opened') ||
      evt.target.classList.contains('popup__close-button')
    ) {
      this.close();
    }
  }
}
