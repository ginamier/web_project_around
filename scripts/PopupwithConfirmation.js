import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmButton = this._popup.querySelector(
      ".popup__button_confirmation"
    );
  }

  setEventListeners() {
    super.setEventListeners();
    this._handleConfirmClick = (evt) => {
      evt.preventDefault();
      this._handleSubmit();
      this.close();
    };
    this._confirmButton.addEventListener("click", this._handleConfirmClick);
  }

  setSubmitAction(action) {
    this._handleSubmit = action;
  }

  removeEventListeners() {
    super.removeEventListeners();
    this._confirmButton.removeEventListener("click", this._handleConfirmClick);
  }
}
