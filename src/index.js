import '../src/index.css';
import { config } from '@utils/constants.js';
import FormValidator from '@components/FormValidator';
import PopupWithForm from '@components/PopupWithForm.js';
import PopupWithConfirm from '@components/PopupWithConfirm.js';
import PopupWithImage from '@components/PopupWithImage.js';
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_API_KEY = process.env.SUPABASE_API_KEY;

const headers = {
  'Content-Type': 'application/json',
  'Prefer': 'return=representation',
  'apikey': SUPABASE_API_KEY,
  'Authorization': `Bearer ${SUPABASE_API_KEY}`
};


//подключение горячих модулей вебпак
if (module.hot) {
  module.hot.accept();
};

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

const popupAvatarEdit = new PopupWithForm('#popup-avatar');
const editAvatarButton = document.querySelector('.profile__avatar-container');
editAvatarButton.addEventListener('click', () => {
  formValidators[popupAvatarEdit.getPopupForm().name].resetValidation()
  popupAvatarEdit.open();
});

const formAvatarEdit = document.querySelector('.form[name="avatar"]');
const avatarInput = document.querySelector('#edit-avatar');
const avatarProfile = document.querySelector('.profile__avatar');

formAvatarEdit.addEventListener('submit', evt => {
  evt.preventDefault();
  avatarInput.value;
  avatarProfile.src = avatarInput.value;
  popupAvatarEdit.close();
  avatarInput.value = '';
});






const popupProfileEdit = new PopupWithForm('#popup-edit');

const nameInput = document.querySelector('#name');
const bioInput = document.querySelector('#about');
const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');

const editProfileButton = document.querySelector('.edit-button');

editProfileButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  bioInput.value = profileBio.textContent;
  formValidators[popupProfileEdit.getPopupForm().name].resetValidation();
  popupProfileEdit.open();
});

const formProfileEdit = document.querySelector('.form[name="edit-profile"]');

formProfileEdit.addEventListener('submit', evt => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileBio.textContent = bioInput.value;
  popupProfileEdit.close();
});







const popupAdd = new PopupWithForm('#popup-create-card');
const addButton = document.querySelector('.add-button');
addButton.addEventListener('click', () => {
  formValidators[popupAdd.getPopupForm().name].resetValidation()
  popupAdd.open();
});

const cardList = document.querySelector('.cards__list');
const formCreateCard = document.querySelector('.form[name="create-card"]');
const cardTitleInput = document.querySelector('#create-card__title');
const cardLinkInput = document.querySelector('#create-card__link');
// const cardTitle = document.querySelector('.card__title');
// const cardPhoto = document.querySelector('.card__photo');


fetch(`https://mesto.nomoreparties.co/v1/cohort-34/cards`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    // 'Prefer': 'return=representation',
    // 'apikey': SUPABASE_API_KEY,
    authorization: `19e0a0be-b386-40fd-af16-51b037973d07`
  }
}).then(response => console.log(response.json()))

function addNewCard(title, link) {
  // Клон элемента карточки по шаблону
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__photo').src = link;
  cardElement.querySelector('.card__photo').alt = title;
  cardElement.querySelector('.card__title').textContent = title;

  cardList.prepend(cardElement);
}

// Обработчик отправки формы
formCreateCard.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const title = cardTitleInput.value;
  const link = cardLinkInput.value;

  // Добавление карточки на страницу
  addNewCard(title, link);

  fetch(`${SUPABASE_URL}/rest/v1/cards`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      name: title,
      link: link
    })
  })
    .then(response => {
      if (!response.ok) {
        return response.json().then(error => {
          throw new Error(error.message)
        });
      }
      response.json()
        .then(response => console.log(response));
    })
    .catch(error => {
      console.error('Ошибка при добавлении карточки:', error.message)
    })

  // Очистка полей формы
  cardLinkInput.value = '';
  cardTitleInput.value = '';
  popupAdd.close();
});







const popupDeleteCard = new PopupWithConfirm('#popup-delete-card');
const formDeleteCard = document.querySelector('.form[name="delete-card"]');

cardList.addEventListener('click', evt => {
  if (evt.target.matches('.card__delete')) {
    popupDeleteCard.open();
    const listItem = evt.target.closest('.card');
    formDeleteCard.addEventListener('submit', evt => {
      evt.preventDefault();
      listItem.remove();
      popupDeleteCard.close();
    });
  }
});






const popupFullScreenPicture = new PopupWithImage('#popup-picture');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

// открыть картинку на которую нажали если нажали на картинку в контейнере карточек
cardList.addEventListener('click', evt => {
  const evtTarget = evt.target;
  if (evtTarget.matches('.card__like-button, .card__delete')) return; // закончить обработку если клик на кнопку лайка или корзины

  const cardItem = evtTarget.closest('.card');
  if (!cardItem) return; // закончить обработку если клик не по карточке
  const cardPicture = cardItem.querySelector('.card__photo');

  popupImage.src = cardPicture.src;
  popupImage.alt = cardPicture.alt;
  popupCaption.textContent = cardPicture.alt;
  popupFullScreenPicture.open();
});

// поставить лайк, если нажали на кнопку лайка в контейнере карточек
cardList.addEventListener('click', evt => {
  const evtTarget = evt.target;
  if (evtTarget.matches('.card__like-button')) {
    evtTarget.classList.toggle('card__like-button_active');
  }
});



const initialCards = [
  {
    name: 'Вроде Англия, а вроде не Англия',
    link: 'https://images.unsplash.com/photo-1731877798699-3445269c7d61?q=80&w=2675&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    name: 'Парк в штате Орегон',
    link: 'https://images.unsplash.com/photo-1632297174075-88bf9f2ae509?q=80&w=2535&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    name: 'Таверна в Занзибаре',
    link: 'https://images.unsplash.com/photo-1731641772346-46aff772fd9b?q=80&w=2675&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    name: 'Нет лучше в NFS',
    link: 'https://images.unsplash.com/photo-1727258720973-fefc6360944d?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    name: 'Погнал в ассасина катну',
    link: 'https://images.unsplash.com/photo-1732021408762-7c8fca31da79?q=80&w=2536&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    name: 'Северное сияние в Исландии',
    link: 'https://images.unsplash.com/photo-1679163903973-2ddc083c8fcc?q=80&w=2519&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    name: 'Ночное путешествие по Австрии',
    link: 'https://images.unsplash.com/photo-1688410053610-42290a7267df?q=80&w=2458&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    name: 'прикол',
    link: 'https://images.unsplash.com/photo-1734021619978-e544c3607c28?q=80&w=1828&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    name: 'Состояние по жизни',
    link: 'https://images.unsplash.com/photo-1732692694163-1541619a602c?q=80&w=2372&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  }
];


initialCards.forEach(card => addNewCard(card.name, card.link));
