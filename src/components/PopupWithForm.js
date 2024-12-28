import Popup from '@components/Popup';

export default class PopupWithForm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  getPopupForm() {
    const form = this.popup.querySelector('.form');
    return form
  }

  close() {
    this.getPopupForm().reset();
    super.close();
  }
}
