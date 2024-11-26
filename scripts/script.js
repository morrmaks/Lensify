class Popup {
  constructor(popupSelector) {
    this.popup = document.querySelector(popupSelector);
  }

  open() {
    this.popup.classList.add('popup__opened');
    document.addEventListener('keydown', evt => this.#handleClickEsc(evt));
    this.popup.addEventListener('mousedown', evt => this.#handleCloseEvent(evt));
  }

  close() {
    this.popup.classList.remove('popup__opened');
    document.removeEventListener('keydown', evt => this.#handleClickEsc(evt));
    this.popup.removeEventListener('mousedown', evt => this.#handleCloseEvent(evt));
  }

  #handleClickEsc(evt) {
    if (evt.key === "Escape") {
      this.close();
    };
  }

  #handleCloseEvent(evt) {
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


formCreateCard.addEventListener('submit', evt => {
  evt.preventDefault();
  // клон элемента карточки по шаблону
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__photo').src = cardLinkInput.value;
  cardElement.querySelector('.card__photo').alt = cardTitleInput.value;
  cardElement.querySelector('.card__title').textContent = cardTitleInput.value;

  cardList.append(cardElement);
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
