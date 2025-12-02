import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleSubmit, openButton }) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector("form");
    this._submitButton = this._form.querySelector(".popup__button");
    this._originalButtonText = this._submitButton.textContent;
    this._onFormSubmit = this._onFormSubmit.bind(this);
    this._openButton = openButton;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._onFormSubmit);
    if (this._openButton) {
      this._openButton.addEventListener("click", () => {
        this.open();
      });
    }
  }

  renderLoading(isLoading, loadingText = "Guardando...") {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._originalButtonText;
    }
  }

  _onFormSubmit(evt) {
    evt.preventDefault();
    const formValues = this._getInputValues();
    this._handleSubmit(formValues);
  }

  _getInputValues() {
    const inputs = this._form.querySelectorAll("input");
    const formValues = {};
    inputs.forEach((input) => (formValues[input.name] = input.value));
    return formValues;
  }

  close() {
    this._form.reset();
    super.close();
  }
}
