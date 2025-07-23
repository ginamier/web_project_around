let profileName = document.querySelector(".profile__info-name");
let profileTitle = document.querySelector(".profile__info-title");

let popupInputName = document.querySelector("#popup-input-name");
let popupInputAbout = document.querySelector("#popup-input-about");

let editButton = document.querySelector(".profile__info-button");
let profilePopup = document.querySelector(".popup");
let profileClosePopupButton = profilePopup.querySelector(
  ".popup__close-button"
);
let profileFormElement = profilePopup.querySelector(".popup__form");

const popupAddCard = document.querySelector(".popup-add-card");
const addCardCloseButton = popupAddCard.querySelector(".popup__close-button");
const addCardForm = popupAddCard.querySelector(".popup__form");
const popupInputTitle = popupAddCard.querySelector("#popup-input-title");
const popupInputUrl = popupAddCard.querySelector("#popup-input-url");

const imagePopup = document.querySelector(".popup_type_image");
const imagePopupImage = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");
const imagePopupCloseButton = imagePopup.querySelector(".popup__close-button");

const addButton = document.querySelector(".profile__add-button");

function openPopup() {
  profilePopup.classList.add("popup__opened");
}

function closePopup() {
  popupInputName.value = profileName.textContent;
  popupInputAbout.value = profileTitle.textContent;
  profilePopup.classList.remove("popup__opened");
}

editButton.addEventListener("click", openPopup);
profileClosePopupButton.addEventListener("click", closePopup);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  let newName = popupInputName.value;
  let newAbout = popupInputAbout.value;

  profileName.textContent = newName;
  profileTitle.textContent = newAbout;

  closePopup();
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

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

function createCard(cardData) {
  const elementsContainer = document.createElement("div");
  elementsContainer.classList.add("elements__container");

  const image = document.createElement("img");
  image.classList.add("elements__image");
  image.src = cardData.link;
  image.alt = cardData.name;
  image.addEventListener("click", function () {
    openImagePopup(cardData.name, cardData.link);
  });

  const removeButton = document.createElement("button");
  removeButton.classList.add("elements__remove-button");
  removeButton.type = "button";
  removeButton.addEventListener("click", function () {
    elementsContainer.remove();
  });

  const elementsDescription = document.createElement("div");
  elementsDescription.classList.add("elements__description");

  const elementsDescriptionTitle = document.createElement("h2");
  elementsDescriptionTitle.classList.add("elements__description-title");
  elementsDescriptionTitle.textContent = cardData.name;

  const likeButton = document.createElement("button");
  likeButton.type = "button";
  likeButton.classList.add("elements__like-button");
  likeButton.addEventListener("click", function () {
    this.classList.toggle("elements__like-button_active");
  });

  elementsDescription.append(elementsDescriptionTitle, likeButton);
  elementsContainer.append(image, elementsDescription, removeButton);
  return elementsContainer;
}

initialCards.forEach(function (cardData) {
  const cardElement = createCard(cardData);
  elementsSection.append(cardElement);
});

function openAddCardPopup() {
  popupAddCard.classList.add("popup-add-card_opened");
  popupInputTitle.value = "";
  popupInputUrl.value = "";
}
addButton.addEventListener("click", openAddCardPopup);

function closeAddCardPopup() {
  popupAddCard.classList.remove("popup-add-card_opened");
}
addCardCloseButton.addEventListener("click", closeAddCardPopup);

addCardForm.addEventListener("submit", submitAddCardForm);

function submitAddCardForm(evt) {
  evt.preventDefault();

  const cardName = popupInputTitle.value;
  const cardLink = popupInputUrl.value;

  const newCardData = {
    name: cardName,
    link: cardLink,
  };

  const newCardElement = createCard(newCardData);
  elementsSection.prepend(newCardElement);

  closeAddCardPopup();
}

function openImagePopup(name, link) {
  imagePopupImage.src = link;
  imagePopupImage.alt = name;
  imagePopupCaption.textContent = name;
  imagePopup.classList.add("popup__opened");
}
function closeImagePopup() {
  imagePopup.classList.remove("popup__opened");
}

imagePopupCloseButton.addEventListener("click", closeImagePopup);
