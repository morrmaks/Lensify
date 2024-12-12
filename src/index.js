import '../src/index.css';
if (module.hot) {
  module.hot.accept();
};

class Popup {
  constructor(popupSelector) {
    this.popup = document.querySelector(popupSelector);
    // возврат функций с привязаннм контекстом
    this.handleClickEsc = this._handleClickEsc.bind(this);
    this.handleCloseEvent = this._handleCloseEvent.bind(this);
  }

  open() {
    this.popup.classList.add('popup__opened');
    document.addEventListener('keydown', this.handleClickEsc);
    this.popup.addEventListener('mousedown', this.handleCloseEvent);
  }

  close() {
    this.popup.classList.remove('popup__opened');
    document.removeEventListener('keydown', this.handleClickEsc); // именнованная функция, что бы можно было удалить слушатель
    this.popup.removeEventListener('mousedown', this.handleCloseEvent);
  }

  _handleClickEsc(evt) {
    if (evt.key === "Escape") {
      this.close();
    };
  }

  _handleCloseEvent(evt) {
    if (
      evt.target.classList.contains('popup__opened') ||
      evt.target.classList.contains('popup__close-button')
    ) {
      this.close();
    }
  }
}

class PopupWithForm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
}

class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
}

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
}

const popupAvatarEdit = new PopupWithForm('#popup-avatar');
const editAvatarButton = document.querySelector('.profile__avatar-container');
editAvatarButton.addEventListener('click', () => popupAvatarEdit.open());

const formAvatarEdit = document.querySelector('.popup__form[name="avatar"]');
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
const editProfileButton = document.querySelector('.edit-button');
editProfileButton.addEventListener('click', () => popupProfileEdit.open());

const formProfileEdit = document.querySelector('.popup__form[name="edit-profile"]');
const nameInput = document.querySelector('#name');
const bioInput = document.querySelector('#about');
const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');

nameInput.value = profileName.textContent;
bioInput.value = profileBio.textContent;

formProfileEdit.addEventListener('submit', evt => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileBio.textContent = bioInput.value;
  popupProfileEdit.close();
});







const popupAdd = new PopupWithForm('#popup-create-card');
const addButton = document.querySelector('.add-button');
addButton.addEventListener('click', () => popupAdd.open())

const cardList = document.querySelector('.cards__list');
const formCreateCard = document.querySelector('.popup__form[name="create-card"]');
const cardTitleInput = document.querySelector('#create-card__title');
const cardLinkInput = document.querySelector('#create-card__link');
const cardTitle = document.querySelector('.card__title');
const cardPhoto = document.querySelector('.card__photo');


function addNewCard(title, link) {
  // клон элемента карточки по шаблону
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__photo').src = link;
  cardElement.querySelector('.card__photo').alt = title;
  cardElement.querySelector('.card__title').textContent = title;

  cardList.prepend(cardElement);
}

formCreateCard.addEventListener('submit', evt => {
  evt.preventDefault();
  addNewCard(cardTitleInput.value, cardLinkInput.value);
  // очистка полей
  cardLinkInput.value = '';
  cardTitleInput.value = '';
  popupAdd.close();
})







const popupDeleteCard = new PopupWithConfirm('#popup-delete-card');
const formDeleteCard = document.querySelector('.popup__form[name="delete-card"]');

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

// поставить лайк, если нажали на кнопку лайка в контейнере карточек
cardList.addEventListener('click', evt => {
  const evtTarget = evt.target;
  if (evtTarget.matches('.card__like-button')) {
    evtTarget.classList.toggle('card__like-button_active');
  }
});
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
    name: 'Че за негатив?',
    link: 'https://images.unsplash.com/photo-1718462670652-8db865f862bc?q=80&w=2385&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    name: 'Состояние по жизни',
    link: 'https://images.unsplash.com/photo-1732692694163-1541619a602c?q=80&w=2372&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  }
];


initialCards.forEach(card => addNewCard(card.name, card.link));

