let profileName = document.querySelector(".profile__info-name");
let profileTitle = document.querySelector(".profile__info-title");

let popupInputName = document.querySelector("#popup-input-name");
let popupInputAbout = document.querySelector("#popup-input-about");

let editButton = document.querySelector(".profile__info-button");
let closePopupButton = document.querySelector(".popup__close-button");
let popup = document.querySelector(".popup");

let heartButtons = document.querySelectorAll(".elements__description-button");

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

for (let i = 0; i < heartButtons.length; i++) {
  const currentButton = heartButtons[i];

  currentButton.addEventListener("click", function () {
    this.classList.toggle("elements__description-button_active");
  });
}

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
