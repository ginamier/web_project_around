export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector(".popup__close-button");
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClick = this._handleOverlayClick.bind(this);
    this._handleCloseButtonClick = this._handleCloseButtonClick.bind(this);
  }

  open() {
    this._popup.classList.add("popup__opened");
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove("popup__opened");
    this.removeEventListeners();
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleOverlayClick(evt) {
    if (evt.target === this._popup) {
      this.close();
    }
  }

  _handleCloseButtonClick() {
    this.close();
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", this._handleCloseButtonClick);
    this._popup.addEventListener("click", this._handleOverlayClick);
    document.addEventListener("keydown", this._handleEscClose);
  }

  removeEventListeners() {
    this._closeButton.removeEventListener(
      "click",
      this._handleCloseButtonClick
    );
    this._popup.removeEventListener("click", this._handleOverlayClick);
    document.removeEventListener("keydown", this._handleEscClose);
  }
}
