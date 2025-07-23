let profileName = document.querySelector(".profile__info-name");
let profileTitle = document.querySelector(".profile__info-title");

let popupInputName = document.querySelector("#popup-input-name");
let popupInputAbout = document.querySelector("#popup-input-about");

let editButton = document.querySelector(".profile__info-button");
let closePopupButton = document.querySelector(".popup__close-button");
let popup = document.querySelector(".popup");

function openPopup() {
  popup.classList.add("popup__opened");
}

function closePopup() {
  popupInputName.value = profileName.textContent;
  popupInputAbout.value = profileTitle.textContent;
  popup.classList.remove("popup__opened");
}

editButton.addEventListener("click", openPopup);
closePopupButton.addEventListener("click", closePopup);

let formElement = document.querySelector(".popup__form");
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  let newName = popupInputName.value;
  let newAbout = popupInputAbout.value;

  profileName.textContent = newName;
  profileTitle.textContent = newAbout;

  closePopup();
}

formElement.addEventListener("submit", handleProfileFormSubmit);

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

const popupContainer = document.createElement("div");
popupContainer.classList.add("popup__container");

const popupAddCard = document.createElement("div");
popupAddCard.classList.add("popup-add-card");

const closeButton = document.createElement("button");
closeButton.classList.add("popup__close-button");
closeButton.type = "button";

const popupTitle = document.createElement("h3");
popupTitle.classList.add("popup__title");
popupTitle.textContent = "Nuevo Lugar";

const popupForm = document.createElement("form");
popupForm.classList.add("popup__form");
popupForm.name = "Add Card";

const popupInputTitle = document.createElement("input");
popupInputTitle.classList.add("popup__input", "popup__input_type_title");
popupInputTitle.name = "title";
popupInputTitle.placeholder = "Título";
popupInputTitle.id = "popup-input-title";
popupInputTitle.type = "text";

const popupInputUrl = document.createElement("input");
popupInputUrl.classList.add("popup__input", "popup__input_type_url");
popupInputUrl.name = "url";
popupInputUrl.placeholder = "Enlace de la imagen";
popupInputUrl.id = "popup-input-url";
popupInputUrl.type = "url";

const popupSubmit = document.createElement("button");
popupSubmit.classList.add("popup__button");
popupSubmit.type = "submit";
popupSubmit.textContent = "Crear";

const page = document.querySelector(".page");

popupForm.append(popupInputTitle, popupInputUrl, popupSubmit);
popupContainer.append(closeButton, popupTitle, popupForm);
popupAddCard.append(popupContainer);
page.append(popupAddCard);

const addButton = document.querySelector(".profile__add-button");

function openAddCardPopup() {
  popupAddCard.classList.add("popup-add-card_opened");
}
addButton.addEventListener("click", openAddCardPopup);

function closeAddCardPopup() {
  popupAddCard.classList.remove("popup-add-card_opened");
}
closeButton.addEventListener("click", closeAddCardPopup);

popupForm.addEventListener("submit", submitAddCardForm);

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

const imagePopup = document.querySelector(".popup_type_image"); // El div completo del popup de imagen
const imagePopupImage = imagePopup.querySelector(".popup__image"); // La imagen dentro del popup
const imagePopupCaption = imagePopup.querySelector(".popup__caption"); // El pie de foto dentro del popup
const imagePopupCloseButton = imagePopup.querySelector(".popup__close-button"); // El botón de cerrar de este popup

function openImagePopup(name, link) {
  imagePopupImage.src = link; // Establece la fuente de la imagen
  imagePopupImage.alt = name; // Establece el texto alternativo
  imagePopupCaption.textContent = name; // Establece el pie de foto
  imagePopup.classList.add("popup__opened"); // Muestra el popup
}
function closeImagePopup() {
  imagePopup.classList.remove("popup__opened"); // Oculta el popup
}

imagePopupCloseButton.addEventListener("click", closeImagePopup);
