class Popup {
  constructor(popupSelector, openButtonSelector) {
    this.popup = document.querySelector(popupSelector);
    this.openButton = document.querySelector(openButtonSelector);

    this.#bindEvents(); // сразу вызываем метод слушателей событий
  }

  open() {
    this.popup.classList.add('popup__opened');
  }

  close() {
    this.popup.classList.remove('popup__opened');
  }

  #handleCloseEvent(event) {
    if (
      event.target.classList.contains('popup__opened') ||
      event.target.classList.contains('popup__close-button')
    ) {
      this.close();
    }
  }

  #bindEvents() {
    if (this.openButton) { // проверяем есть ли кнопка, что бы не было ошибки если нет
      this.openButton.addEventListener('click', () => this.open()); // вызов метода open() у объекта после клика, стрелочная функция не создает контекста для this
    }
    this.popup.addEventListener('mousedown', (event) => this.#handleCloseEvent(event));
  }
}

const editPopup = new Popup('.popup-edit', '#edit-button');
const addButtin = new Popup('.popup-add', '#add-button');

