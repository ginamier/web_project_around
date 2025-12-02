import Popup from "./Popup.js";
import UserInfo from "./UserInfo.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import { Card } from "./card.js";
import CardsManager from "./CardsManager.js";
import { FormValidator } from "./FormValidator.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "./PopupwithConfirmation.js";

const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "98f66a30-b1a8-4edf-83f3-0c983454d266",
    "Content-Type": "application/json",
  },
});

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_invalid",
  errorMessageClass: "popup__input-error-message_active",
};

const userInfo = new UserInfo({
  nameSelector: ".profile__info-name",
  aboutSelector: ".profile__info-title",
});

const imagePopup = new PopupWithImage(".popup_type_image");

const confirmDeletePopup = new PopupWithConfirmation(
  ".popup-with-confirmation"
);

let cardsmanager;
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userInfoData, cards]) => {
    userInfo.setUserInfo({
      name: userInfoData.name,
      about: userInfoData.about,
    });

    cardsmanager = new CardsManager({
      cards: cards,
      containerSelector: ".elements",
      renderer: (card) => {
        const newCard = new Card({
          card: card,
          templateSelector: "#card-template",
          handleCardClick: (name, link) => {
            imagePopup.open(name, link);
          },
          handleDeleteClick: (cardId, cardElement) => {
            confirmDeletePopup.open(() => {
              api
                .deleteCard(cardId)
                .then(() => {
                  cardElement.remove();
                  confirmDeletePopup.close();
                })
                .catch((err) => {
                  console.log(err);
                });
            });
          },
          handleLike: (cardId, isLiked, updateCardState) => {
            if (isLiked) {
              api
                .removeLike(cardId)
                .then(() => {
                  updateCardState(false);
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              api
                .addLike(cardId)
                .then(() => {
                  updateCardState(true);
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          },
        });

        const cardElement = newCard.generateCard();
        return cardElement;
      },
    });
    cardsmanager.renderCards();
  })
  .catch((err) => {
    console.log("Error:", err);
  });

const addCardPopup = new PopupWithForm({
  popupSelector: ".popup-add-card",
  handleSubmit: (formValues) => {
    api
      .postCard(formValues)
      .then((postedCard) => {
        const newCard = new Card({
          card: postedCard,
          templateSelector: "#card-template",
          handleCardClick: (name, link) => {
            imagePopup.open(name, link);
          },
          handleDeleteClick: (cardId, cardElement) => {
            confirmDeletePopup.open(() => {
              api
                .deleteCard(cardId)
                .then(() => {
                  cardElement.remove();
                  confirmDeletePopup.close();
                })
                .catch((err) => {
                  console.log(err);
                });
            });
          },
          handleLike: (cardId, isLiked, updateCardState) => {
            if (isLiked) {
              api
                .removeLike(cardId)
                .then(() => {
                  updateCardState(false);
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              api
                .addLike(cardId)
                .then(() => {
                  updateCardState(true);
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          },
        });
        const cardElement = newCard.generateCard();
        cardsmanager.appendElement(cardElement);
        addCardPopup.close();
      })
      .catch((err) => {
        console.log("Error al agregar tarjeta:", err);
      });
  },
  openButton: document.querySelector(".profile__add-button"),
});
addCardPopup.setEventListeners();

const editAvatarPopup = new PopupWithForm({
  popupSelector: ".popup__type_edit_avatar",
  handleSubmit: (formValues) => {
    editAvatarPopup.renderLoading(true);

    api
      .updateAvatar(formValues.avatar)
      .then((userData) => {
        const profileAvatar = document.querySelector(".profile__avatar");
        profileAvatar.src = userData.avatar;
        editAvatarPopup.close();
      })
      .catch((error) => {
        console.error("Error al actualizar avatar:", error);
      })
      .finally(() => {
        editAvatarPopup.renderLoading(false);
      });
  },
  openButton: document.querySelector(".profile__edit-icon"),
});
editAvatarPopup.setEventListeners();

const editProfilePopup = new PopupWithForm({
  popupSelector: ".popup_type_edit_profile",
  handleSubmit: (formValues) => {
    editProfilePopup.renderLoading(true);

    api
      .updateProfileInfo(formValues)
      .then((result) => {
        userInfo.setUserInfo(formValues);
        editProfilePopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        editProfilePopup.renderLoading(false);
      });
  },
});
editProfilePopup.setEventListeners();

const profileFormElement = document.querySelector(
  ".popup_type_edit_profile .popup__form"
);

const editFormValidator = new FormValidator(
  validationConfig,
  profileFormElement
);
editFormValidator.enableValidation();

document
  .querySelector(".profile__info-button")
  .addEventListener("click", () => {
    const currentUser = userInfo.getUserInfo();
    document.querySelector("#popup-input-name").value = currentUser.name;
    document.querySelector("#popup-input-about").value = currentUser.about;
    editProfilePopup.open();
  });

const addCardForm = document.querySelector(".popup-add-card .popup__form");

const addCardFormValidator = new FormValidator(validationConfig, addCardForm);
addCardFormValidator.enableValidation();
