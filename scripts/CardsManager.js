export default class CardsManager {
  constructor({ cards, renderer, containerSelector }) {
    this.cards = cards;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderCards() {
    this.cards.forEach((card) => {
      const cardElement = this._renderer(card);
      this.appendElement(cardElement);
    });
  }

  appendElement(element) {
    this._container.append(element);
  }
}
