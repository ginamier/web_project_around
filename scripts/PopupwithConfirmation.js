import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmButton = this._popup.querySelector(
      ".popup__button_confirmation"
    );
    this._handleConfirmClick = this._handleConfirmClick.bind(this);
  }

  open(action) {
    this._handleSubmit = action;
    super.open();
  }
  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", this._handleConfirmClick);
  }

  _handleConfirmClick(evt) {
    evt.preventDefault();
    this._handleSubmit();
    this.close();
  }

  removeEventListeners() {
    super.removeEventListeners();
    this._confirmButton.removeEventListener("click", this._handleConfirmClick);
  }
}
