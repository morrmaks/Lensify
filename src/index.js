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

let userId

api.renderUserAndCards()
  .then(([cards, user]) => {
    userId = user[0].id;
    userInfo.setUserInfo(user[0]);
    userInfo.setUserAvatar(user[0]);
    cards.forEach(card => {
      cardList.addItem(createNewCard(card));
    })
  })
  .catch(err => console.log(err));




const cardList = new Section('.cards__list');



const userInfo = new UserInfo({
  avatarSelector: '.profile__avatar',
  nameSelector: '.profile__name',
  bioSelector:'.profile__bio'
})


function createNewCard(data) {
  const card = new Card(data, '#card-template', handleCardDelete, handleCardImageZoom, handleLikeSet, handleLikeDelete);
  return card.createCard();
}


function handleCardDelete() {

}
function handleCardImageZoom() {

}
function handleLikeSet() {

}
function handleLikeDelete() {

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



// fetch(`https://mesto.nomoreparties.co/v1/cohort-34/users/me`, {
//   method: 'GET',
//   headers: {
//     'Content-Type': 'application/json',
//     // 'Prefer': 'return=representation',
//     // 'apikey': SUPABASE_API_KEY,
//     authorization: `19e0a0be-b386-40fd-af16-51b037973d07`
//   }
// }).then(response => console.log(response.json()))





// const popupDeleteCard = new PopupWithConfirm('#popup-delete-card');
// const formDeleteCard = document.querySelector('.form[name="delete-card"]');

// cardList.addEventListener('click', evt => {
//   if (evt.target.matches('.card__delete')) {
//     popupDeleteCard.open();
//     const listItem = evt.target.closest('.card');
//     formDeleteCard.addEventListener('submit', evt => {
//       evt.preventDefault();
//       listItem.remove();
//       popupDeleteCard.close();
//     });
//   }
// });






const popupFullScreenPicture = new PopupWithImage('#popup-picture');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

// открыть картинку на которую нажали если нажали на картинку в контейнере карточек
// cardList.addEventListener('click', evt => {
//   const evtTarget = evt.target;
//   if (evtTarget.matches('.card__like-button, .card__delete')) return;

//   const cardItem = evtTarget.closest('.card');
//   if (!cardItem) return;

//   const cardPicture = cardItem.querySelector('.card__image');

//   popupImage.src = cardPicture.src;
//   popupImage.alt = cardPicture.alt;
//   popupCaption.textContent = cardPicture.alt;
//   popupFullScreenPicture.open();
// });

// поставить лайк, если нажали на кнопку лайка в контейнере карточек
// cardList.addEventListener('click', evt => {
//   const evtTarget = evt.target;
//   if (evtTarget.matches('.card__like-button')) {
//     evtTarget.classList.toggle('card__like-button_active');
//   }
// });





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
