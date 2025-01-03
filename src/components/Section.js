export default class Section {
  constructor (containerSelector) {
    this._container = document.querySelector(containerSelector);
  }

  addItem(element, insertMethod) {
    if (insertMethod == 'append') {
      this._container.append(element);
    } else {
      this._container.prepend(element);
    }
  }
}
