import Popup from '@components/Popup';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this.popup.querySelector('.popup__image');
    this._popupCaption = this.popup.querySelector('.popup__caption');
  }

  open(image, title) {
    this._popupImage.src = image;
    this._popupImage.alt = title;
    this._popupCaption.textContent = title;
    super.open();
  }
}
