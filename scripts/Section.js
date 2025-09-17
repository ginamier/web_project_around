export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this.items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this.items.forEach((item) => {
      const element = this._renderer(item);
      this._container.append(element);
    });
  }

  addItem(element) {
    this._container.prepend(element); // prepend si quieres que los nuevos vayan al inicio
  }
}
