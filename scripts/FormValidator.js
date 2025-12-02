export class FormValidator {
  constructor(validationConfig, formElement) {
    this._validationConfig = validationConfig;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._validationConfig.inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._validationConfig.submitButtonSelector
    );
  }

enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners();
  }

  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement, validationMessage) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error-message`
    );
    inputElement.classList.add(this._validationConfig.inputErrorClass);
    errorElement.textContent = validationMessage;
    errorElement.classList.add(this._validationConfig.errorMessageClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error-message`
    );
    inputElement.classList.remove(this._validationConfig.inputErrorClass);
    errorElement.classList.remove(this._validationConfig.errorClass);
    errorElement.textContent = "";
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(
        this._validationConfig.inactiveButtonClass
      );
    } else {
      this._buttonElement.classList.remove(
        this._validationConfig.inactiveButtonClass
      );
    }
  }

   _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

}
