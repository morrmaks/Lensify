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

const api = new Api(SUPABASE_URL, SUPABASE_API_KEY)


async function initializeApp() {
  try {
    document.querySelector('.body').style.backgroundColor = 'red';

    const [cards, user] = await api.renderUserAndCards();
    userInfo.renderUserInfo(user[0]);
    cardList.processAndRenderCards(cards)
    // const cardPromises = await cardList.buildCardsArray(cards);
    // const cardElements = await Promise.all(cardPromises);

    // cardList.renderSection(cardElements);
  } catch (err) {
    console.log(`Ошибка загрузки данных: ${err}`);
  }
  finally {
    document.querySelector('.body').style.backgroundColor = 'black';
  }
}

initializeApp();


const cardList = new Section('.cards__list', buildCardsArray);

function buildCardsArray(cards) {
  const cardPromises = cards.map(async card => {
    const likes = await api.getLikesForCard(card);
    return createNewCard(card, likes);
  });
  return cardPromises;
}


const userInfo = new UserInfo({
  avatarSelector: '.profile__avatar',
  nameSelector: '.profile__name',
  bioSelector: '.profile__bio'
})


function createNewCard(data, likes) {
  const card = new Card(data, likes, '#card-template', handleCardDelete, handleCardImageZoom, handleLikeSet, handleLikeDelete, userInfo.userId);
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
    .catch(err => console.log(err))
}

function handleLikeDelete(cardData) {
  return api.deleteLike(cardData.data, userInfo.getUserObject())
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
    .then(async card => {
      const likes = await api.getLikesForCard(card[0]);
      cardList.addItem(createNewCard(card[0], likes));
      popupAddCard.close();
    })
    .catch(err => console.log(err))
    .finally(() => submitButton.textContent = 'Создать')
});


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

//подключение валидации всех форм
const formValidators = [];

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

