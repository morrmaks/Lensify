import '../src/index.css';
import Api from '@components/Api.js';
import Card from '@components/Card.js';
import FormValidator from '@components/FormValidator';
import PopupWithForm from '@components/PopupWithForm.js';
import PopupWithConfirm from '@components/PopupWithConfirm.js';
import PopupWithImage from '@components/PopupWithImage.js';
import Section from '@components/Section.js';
import UserInfo from '@components/UserInfo.js';
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_API_KEY = process.env.SUPABASE_API_KEY;
import {
  editAvatarButton,
  editProfileButton,
  addCardButton,
  nameInput,
  bioInput,
  config
} from '@utils/constants.js';

//подключение горячих модулей вебпак
if (module.hot) {
  module.hot.accept();
};

const api = new Api(SUPABASE_URL, {
    'Content-Type': 'application/json',
    'Prefer': 'return=representation',
    'apikey': SUPABASE_API_KEY,
    'Authorization': `Bearer ${SUPABASE_API_KEY}`
  }
);

let userId;

api.renderUserAndCards()
  .then(([cards, user]) => {
    userId = user[0].id;
    userInfo.renderUserInfo(user[0]);
    cards.forEach(card => {
      cardList.addItem(createNewCard(card), 'append');
    });
  })
  .catch(err => console.log(err));


const cardList = new Section('.cards__list');


const userInfo = new UserInfo({
  avatarSelector: '.profile__avatar',
  nameSelector: '.profile__name',
  bioSelector:'.profile__bio'
})


function createNewCard(data) {
  const card = new Card(data, '#card-template', handleCardDelete, handleCardImageZoom, handleLikeSet, handleLikeDelete, userId);
  return card.createCard();
}

function handleCardDelete(cardData) {
  popupDeleteCard.open(cardData);
}

function handleCardImageZoom(cardData) {
  popupFullScreenPicture.open(cardData);
}

function handleLikeSet(cardData) {
  return api.setLike(cardData.data, userInfo.getUserObject())
    .then(res => cardData.counter.textContent = res[0].likes.length)
    .catch(err => console.log(err))
}

function handleLikeDelete(cardData) {
  return api.deleteLike(cardData.data, userInfo.getUserObject())
    .then(res => cardData.counter.textContent = res[0].likes.length)
    .catch(err => console.log(err))
}


const popupAvatarEdit = new PopupWithForm('#popup-avatar', (data, submitButton) => {
  submitButton.textContent = 'Сохранение...';
  api.setUserAvatar(data, userId)
    .then(data => {
      userInfo.setUserAvatar(data[0]);
      popupAvatarEdit.close();
    })
    .catch(err => console.log(err))
    .finally(() => submitButton.textContent = 'Сохранить')
});


const popupProfileEdit = new PopupWithForm('#popup-edit', (data, submitButton) => {
  submitButton.textContent = 'Сохранение...';
  api.setUserInfo(data, userId)
    .then(data => {
      userInfo.setUserInfo(data[0]);
      popupProfileEdit.close();
    })
    .catch(err => console.log(err))
    .finally(() => submitButton.textContent = 'Сохранить')
});


const popupAddCard = new PopupWithForm('#popup-create-card', (data, submitButton) => {
  submitButton.textContent = 'Создание...';
  api.addCard(data, userId)
    .then(card => {
      cardList.addItem(createNewCard(card[0]));
      popupAddCard.close();
    })
    .catch(err => console.log(err))
    .finally(() => submitButton.textContent = 'Создать')
});


// fetch(`https://mesto.nomoreparties.co/v1/cohort-34/cards`, {
//   method: 'GET',
//   headers: {
//     'Content-Type': 'application/json',
//     authorization: `19e0a0be-b386-40fd-af16-51b037973d07`
//   }
// }).then(response => console.log(response.json()))


const popupDeleteCard = new PopupWithConfirm('#popup-delete-card', (cardData, submitButton) => {
  submitButton.textContent = 'Удаление...';
  api.deleteCard(cardData.data)
    .then(() => {
      cardData.element.remove();
      cardData.element = null;
      popupDeleteCard.close();
    })
    .catch(err => console.log(err))
    .finally(() => submitButton.textContent = 'Да')
});


const popupFullScreenPicture = new PopupWithImage('#popup-picture');


const formValidators = [];
//подключение валидации всех форм
const enableValidationForms = () => {
  const formList = Array.from(document.forms);
  formList.forEach(form => {
    const validator = new FormValidator(config, form);
    formValidators[form.name] = validator;
    validator.enableValidation();
  })
}

enableValidationForms();


editAvatarButton.addEventListener('click', () => {
  formValidators[popupAvatarEdit.popupForm.name].resetValidation()
  popupAvatarEdit.open();
});

editProfileButton.addEventListener('click', () => {
  const profileInfo = userInfo.getUserInfo();
  nameInput.value = profileInfo.name;
  bioInput.value = profileInfo.bio;
  formValidators[popupProfileEdit.popupForm.name].resetValidation();
  popupProfileEdit.open();
});

addCardButton.addEventListener('click', () => {
  formValidators[popupAddCard.popupForm.name].resetValidation()
  popupAddCard.open();
});

