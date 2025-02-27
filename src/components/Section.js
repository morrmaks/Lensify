export default class Section {
  constructor (containerSelector, buildCardsArray) {
    this._container = document.querySelector(containerSelector);
    this._buildCardsArray = buildCardsArray;
  }

  _renderSection(cardElements) {
    cardElements.forEach(card => this.addItem(card, 'append'))
  }

  addItem(element, insertMethod) {
    if (insertMethod === 'append') {
      this._container.append(element);
    } else {
      this._container.prepend(element);
    }
  }

  async processAndRenderCards(cards) {
    const cardPromises = await this._buildCardsArray(cards);
    const cardElements = await Promise.all(cardPromises);
    this._renderSection(cardElements);
  }
}
