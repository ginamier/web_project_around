import {
  openPopup,
  closePopup,
  closePopupOnEscape,
  openImagePopup,
  openAddCardPopup,
} from "./utils.js";
import { Card } from "./card.js";
import { FormValidator } from "./FormValidator.js";

const profileName = document.querySelector(".profile__info-name");
const profileTitle = document.querySelector(".profile__info-title");

const popupInputName = document.querySelector("#popup-input-name");
const popupInputAbout = document.querySelector("#popup-input-about");

const editButton = document.querySelector(".profile__info-button");
const profilePopup = document.querySelector(".popup");
const profileClosePopupButton = profilePopup.querySelector(
  ".popup__close-button"
);
const profileFormElement = profilePopup.querySelector(".popup__form");

const popupAddCard = document.querySelector(".popup-add-card");
const addCardCloseButton = popupAddCard.querySelector(".popup__close-button");
const addCardForm = popupAddCard.querySelector(".popup__form");
const popupInputTitle = popupAddCard.querySelector("#popup-input-title");
const popupInputUrl = popupAddCard.querySelector("#popup-input-url");

const addButton = document.querySelector(".profile__add-button");

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
const elementsSection = document.querySelector(".elements");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = popupInputName.value;
  profileTitle.textContent = popupInputAbout.value;
  closePopup(profilePopup);
}

function submitAddCardForm(evt) {
  evt.preventDefault();
  const cardName = popupInputTitle.value;
  const cardLink = popupInputUrl.value;
  const newCardData = {
    name: cardName,
    link: cardLink,
  };

  const newCardElement = new Card(
    newCardData,
    "#card-template",
    openImagePopup
  ).generateCard();
  elementsSection.prepend(newCardElement);
  closePopup(popupAddCard);
}

initialCards.forEach((cardData) => {
  const card = new Card(cardData, "#card-template", openImagePopup);
  const cardElement = card.generateCard();
  elementsSection.append(cardElement);
});

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_invalid",
  errorClass: "popup__input-error-message_active",
};

const editFormValidator = new FormValidator(
  validationConfig,
  profileFormElement
);
editFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(validationConfig, addCardForm);
addCardFormValidator.enableValidation();
