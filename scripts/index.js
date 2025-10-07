import Popup from "./Popup.js";
import UserInfo from "./UserInfo.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import { Card } from "./card.js";
import Section from "./Section.js";
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

const imagePopup = new PopupWithImage(".popup_type_image");
imagePopup.setEventListeners();

const confirmDeletePopup = new PopupWithConfirmation(
  ".popup-with-confirmation"
);

confirmDeletePopup.setEventListeners();
confirmDeletePopup.setSubmitAction();

let cardSection;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userInfoData, cards]) => {
    console.log("Usuario:", userInfoData);
    console.log("Tarjetas:", cards);

    userInfo.setUserInfo({
      name: userInfoData.name,
      about: userInfoData.about,
    });

    cardSection = new Section(
      {
        items: cards,
        renderer: (item) => {
          const card = new Card(
            item,
            "#card-template",
            (name, link) => {
              imagePopup.open(name, link);
            },
            (cardId, cardElement) => {
              confirmDeletePopup.open();
              confirmDeletePopup.setSubmitAction(() => {
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
            (cardId, isLiked, updateCardState) => {
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
            }
          ); //CIERRA CONSTRUCTOR CARD

          const cardElement = card.generateCard();
          return cardElement;
        }, //CIERRA RENDERER
      }, //CIERRA 1 PARAMETRO ARRAY DE NEW SECTION
      ".elements"
    ); //CIERRA NEW SECTION
    cardSection.renderItems();

    /*TODO: agregar handledelete*/

    const addCardPopup = new PopupWithForm(".popup-add-card", (formData) => {
      console.log("Datos del formulario:", formData);

      api
        .postCard(formData)
        .then((cardData) => {
          const newCard = new Card(
            cardData,
            "#card-template",
            (name, link) => {
              imagePopup.open(name, link);
            },
            (cardId, cardElement) => {
              confirmDeletePopup.open();
              confirmDeletePopup.setSubmitAction(() => {
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
            (cardId, isLiked, updateCardState) => {
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
            }
          );
          const cardElement = newCard.generateCard();
          cardSection.addItem(cardElement);
          addCardPopup.close();
        })
        .catch((err) => {
          console.log("Error al agregar tarjeta:", err);
        });
    });
    addCardPopup.setEventListeners();

    document
      .querySelector(".profile__add-button")
      .addEventListener("click", () => {
        addCardPopup.open();
      });
  })
  .catch((err) => {
    console.log("Error:", err);
  });

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

const editAvatarPopup = new PopupWithForm(
  ".popup__type_edit_avatar",
  (formData) => {
    const submitButton = document.querySelector(
      ".popup__type_edit_avatar .popup__button"
    );
    const originalText = submitButton.textContent;

    submitButton.textContent = "Guardando...";

    api
      .updateAvatar(formData.avatar)
      .then((userData) => {
        const profileAvatar = document.querySelector(".profile__avatar");

        profileAvatar.src = userData.avatar;
      })
      .catch((error) => {
        console.error("Error al actualizar avatar:", error);
      })
      .finally(() => {
        submitButton.textContent = originalText;
        editAvatarPopup.close();
      });
  }
);
editAvatarPopup.setEventListeners();

document.querySelector(".profile__edit-icon").addEventListener("click", () => {
  editAvatarPopup.open();
});

const editProfilePopup = new PopupWithForm(
  ".popup_type_edit_profile",
  (formData) => {
    const submitButton = document.querySelector(
      ".popup_type_edit_profile .popup__button"
    );
    const originalText = submitButton.textContent;

    submitButton.textContent = "Guardando...";
    api
      .updateProfileInfo(formData)
      .then((result) => {
        userInfo.setUserInfo(formData);
        editProfilePopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        submitButton.textContent = originalText;
      });
  }
);
editProfilePopup.setEventListeners();

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
