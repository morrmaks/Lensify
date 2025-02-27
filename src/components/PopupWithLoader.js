import Popup from '@components/Popup';

export default class PopupWithLoader extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._loader = this.popup.querySelector('.popup__loader_spinner');
  }

  open() {
    this._loader.classList.add('popup__loader_animation-active');
    super.open();
  }

  close() {
    this._loader.classList.remove('popup__loader_animation-active');
    super.close();
  }
}
