import PopupWithImage from "./PopupWithImage.js";

export class Card {
  constructor({
    card,
    templateSelector,
    handleCardClick,
    handleDeleteClick,
    handleLike,
  }) {
    this._id = card._id;
    this._name = card.name;
    this._isLiked = card._isLiked;
    this._link = card.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLike = handleLike;
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._cardElement.querySelector(
      ".elements__description-title"
    ).textContent = this._name;
    this._cardElement.querySelector(".elements__image").src = this._link;
    this._cardElement.querySelector(".elements__image").alt = this._name;
    if (this._isLiked) {
      this._cardElement
        .querySelector(".elements__like-button")
        .classList.add("elements__like-button_active");
    }

    this._setEventListeners();

    return this._cardElement;
  }

  _getTemplate() {
    const templateClone = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__container")
      .cloneNode(true);
    return templateClone;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".elements__image")
      .addEventListener("click", () =>
        this._handleCardClick(this._name, this._link)
      );

    this._cardElement
      .querySelector(".elements__like-button")
      .addEventListener("click", () => this._handleLikeToggle());

    this._cardElement
      .querySelector(".elements__remove-button")
      .addEventListener("click", () => this._handleDeleteCard());
  }

  _handleLikeToggle() {
    this._handleLike(this._id, this._isLiked, this._updateCardState.bind(this));
  }

  _updateCardState(isLiked) {
    this._isLiked = isLiked;

    const likeButton = this._cardElement.querySelector(
      ".elements__like-button"
    );

    if (this._isLiked) {
      likeButton.classList.add("elements__like-button_active");
    } else {
      likeButton.classList.remove("elements__like-button_active");
    }
  }

  _handleDeleteCard() {
    this._handleDeleteClick(this._id, this._cardElement);
  }
}
