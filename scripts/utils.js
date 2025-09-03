import { Card } from "./card.js";

const imagePopup = document.querySelector(".popup_type_image");
const imagePopupImage = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");

const profilePopup = document.querySelector(".popup");
const profileInputName = profilePopup.querySelector("#popup-input-name");
const profileInputAbout = profilePopup.querySelector("#popup-input-about");

const addCardPopup = document.querySelector(".popup-add-card");
const addCardInputTitle = addCardPopup.querySelector("#popup-input-title");
const addCardInputUrl = addCardPopup.querySelector("#popup-input-url");

const profileName = document.querySelector(".profile__info-name");
const profileTitle = document.querySelector(".profile__info-title");
const editButton = document.querySelector(".profile__info-button");
const addButton = document.querySelector(".profile__add-button");

export function openAddCardPopup() {
  addCardInputTitle.value = "";
  addCardInputUrl.value = "";
  openPopup(addCardPopup);
}

export function submitAddCardForm(evt) {
  evt.preventDefault();

  const cardName = addCardInputTitle.value;
  const cardLink = addCardInputUrl.value;

  const newCardData = {
    name: cardName,
    link: cardLink,
  };

  const newCardElement = new Card(
    newCardData,
    "#card-template",
    openImagePopup
  ).generateCard();

  const elementsSection = document.querySelector(".elements");
  elementsSection.prepend(newCardElement);

  closePopup(addCardPopup);

  addCardPopup.querySelector(".popup__form").reset();
}

export function openImagePopup(name, link) {
  imagePopupImage.src = link;
  imagePopupImage.alt = name;
  imagePopupCaption.textContent = name;
  openPopup(imagePopup);
}

export function openProfilePopup() {
  profileInputName.value = profileName.textContent;
  profileInputAbout.value = profileTitle.textContent;
  openPopup(profilePopup);
}

export function openPopup(popupElement) {
  if (popupElement === addCardPopup) {
    popupElement.classList.add("popup-add-card_opened");
  } else {
    popupElement.classList.add("popup__opened");
  }

  document.addEventListener("keydown", closePopupOnEscape);
}

export function closePopup(popupElement) {
  if (popupElement === addCardPopup) {
    popupElement.classList.remove("popup-add-card_opened");
  } else {
    popupElement.classList.remove("popup__opened");
  }

  document.removeEventListener("keydown", closePopupOnEscape);
}

export function closePopupOnEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup__opened");
    closePopup(openedPopup);
  }
}

document
  .querySelector(".popup__close-button")
  .addEventListener("click", () => closePopup(profilePopup));
document
  .querySelector(".popup-add-card .popup__close-button")
  .addEventListener("click", () => closePopup(addCardPopup));
document
  .querySelector(".popup_type_image .popup__close-button")
  .addEventListener("click", () => closePopup(imagePopup));

editButton.addEventListener("click", openProfilePopup);

addButton.addEventListener("click", openAddCardPopup);

addCardPopup
  .querySelector(".popup__form")
  .addEventListener("submit", submitAddCardForm);
