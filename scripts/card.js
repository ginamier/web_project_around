import PopupWithImage from "./PopupWithImage.js";

export class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    handleDeleteClick,
    handleLike
  ) {
    this._id = data._id;
    this._name = data.name;
    this._isLiked = data._isLiked;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLike = handleLike;
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

  _updateCardState(isLiked) {
    this._isLiked = isLiked;

    const likeButton = this._element.querySelector(".elements__like-button");

    if (this._isLiked) {
      likeButton.classList.add("elements__like-button_active");
    } else {
      likeButton.classList.remove("elements__like-button_active");
    }
  }

  _handleLikeToggle() {
    this._handleLike(this._id, this._isLiked, this._updateCardState.bind(this));
  }

  _handleDeleteCard() {
    this._handleDeleteClick(this._id, this._element);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".elements__description-title").textContent =
      this._name;
    this._element.querySelector(".elements__image").src = this._link;
    this._element.querySelector(".elements__image").alt = this._name;
    if (this._isLiked) {
      this._element
        .querySelector(".elements__like-button")
        .classList.add("elements__like-button_active");
    }

    this._setEventListeners();

    return this._element;
  }
}
