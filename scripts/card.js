export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__container")
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._element
      .querySelector(".elements__image")
      .addEventListener("click", () =>
        this._handleCardClick(this._name, this._link)
      );

    this._element
      .querySelector(".elements__like-button")
      .addEventListener("click", () => this._handleLikeToggle());

    this._element
      .querySelector(".elements__remove-button")
      .addEventListener("click", () => this._handleDeleteCard());
  }

  _handleLikeToggle() {
    this._element
      .querySelector(".elements__like-button")
      .classList.toggle("elements__like-button_active");
  }

  _handleDeleteCard() {
    this._element.remove();
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".elements__description-title").textContent =
      this._name;
    this._element.querySelector(".elements__image").src = this._link;
    this._element.querySelector(".elements__image").alt = this._name;

    this._setEventListeners();

    return this._element;
  }
}
