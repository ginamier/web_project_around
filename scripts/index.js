/*import Popup from "./Popup.js";
import UserInfo from "./UserInfo.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import { Card } from "./card.js";
import Section from "./Section.js";
import { FormValidator } from "./FormValidator.js";

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_invalid",
  errorClass: "popup__input-error-message_active",
};
const profileFormElement = document.querySelector(
  ".popup_type_edit_profile .popup__form"
);
const addCardForm = document.querySelector(".popup-add-card .popup__form");

const userInfo = new UserInfo({
  nameSelector: ".profile__info-name",
  aboutSelector: ".profile__info-title",
});

const imagePopup = new PopupWithImage(".popup_type_image");

const editProfilePopup = new PopupWithForm(
  ".popup_type_edit_profile",
  (formData) => {
    userInfo.setUserInfo(formData);
  }
);
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, "#card-template", (name, link) => {
        imagePopup.open(name, link);
      });
      return card.generateCard();
    },
  },
  ".elements"
);

cardSection.renderItems();

const addCardPopup = new PopupWithForm(".popup-add-card", (formData) => {
  const newCard = new Card(
    { name: formData.title, link: formData.url },
    "#card-template",
    (name, link) => {
      imagePopup.open(name, link);
    }
  );
  const cardElement = newCard.generateCard();
  cardSection.addItem(cardElement);
});

addCardPopup.setEventListeners();

const editFormValidator = new FormValidator(
  validationConfig,
  profileFormElement
);
editFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(validationConfig, addCardForm);
addCardFormValidator.enableValidation();

document
  .querySelector(".profile__info-button")
  .addEventListener("click", () => {
    const currentUser = userInfo.getUserInfo();
    document.querySelector("#popup-input-name").value = currentUser.name;
    document.querySelector("#popup-input-about").value = currentUser.about;
    editProfilePopup.open();
  });

document.querySelector(".profile__add-button").addEventListener("click", () => {
  addCardPopup.open();
});
 */
import Popup from "./Popup.js";
import UserInfo from "./UserInfo.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import { Card } from "./card.js";
import Section from "./Section.js";
import { FormValidator } from "./FormValidator.js";

// Datos iniciales
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

// Configuración de validación
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_invalid",
  errorClass: "popup__input-error-message_active",
};

// Formularios
const profileFormElement = document.querySelector(
  ".popup_type_edit_profile .popup__form"
);
const addCardForm = document.querySelector(".popup-add-card .popup__form");

// Instancias de clases
const userInfo = new UserInfo({
  nameSelector: ".profile__info-name",
  aboutSelector: ".profile__info-title",
});

const imagePopup = new PopupWithImage(".popup_type_image");
imagePopup.setEventListeners();

const editProfilePopup = new PopupWithForm(
  ".popup_type_edit_profile",
  (formData) => {
    userInfo.setUserInfo(formData);
  }
);
editProfilePopup.setEventListeners();

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, "#card-template", (name, link) => {
        imagePopup.open(name, link);
      });
      const cardElement = card.generateCard();
      return cardElement;
    },
  },
  ".elements"
);
cardSection.renderItems();

const addCardPopup = new PopupWithForm(".popup-add-card", (formData) => {
  const newCard = new Card(
    { name: formData.title, link: formData.url },
    "#card-template",
    (name, link) => {
      imagePopup.open(name, link);
    }
  );
  const cardElement = newCard.generateCard();
  cardSection.addItem(cardElement);
});
addCardPopup.setEventListeners();

// Validación
const editFormValidator = new FormValidator(
  validationConfig,
  profileFormElement
);
editFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(validationConfig, addCardForm);
addCardFormValidator.enableValidation();

// Event listeners de botones
document
  .querySelector(".profile__info-button")
  .addEventListener("click", () => {
    const currentUser = userInfo.getUserInfo();
    document.querySelector("#popup-input-name").value = currentUser.name;
    document.querySelector("#popup-input-about").value = currentUser.about;
    editProfilePopup.open();
  });

document.querySelector(".profile__add-button").addEventListener("click", () => {
  addCardPopup.open();
});

window.addCardPopup = addCardPopup;
