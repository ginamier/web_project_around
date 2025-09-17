import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._submitCallback = handleFormSubmit;
    this._form = this._popup.querySelector("form");

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  _getInputValues() {
    const inputs = this._form.querySelectorAll("input");
    const formValues = {};
    inputs.forEach((input) => (formValues[input.name] = input.value));
    return formValues;
  }

  _handleFormSubmit(evt) {
    evt.preventDefault();
    const formData = this._getInputValues();
    this._submitCallback(formData);
    this.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._handleFormSubmit);
  }

  close() {
    super.close();
    this._form.reset();
  }
}
