export default class Card {
  constructor(cardObject, cardTemplateId, handleCardDelete, handleCardImageZoom, handleLikeSet, handleLikeDelete) {
    this._cardObject = cardObject;
    this._title = cardObject.name;
    this._image = cardObject.link;
    this._likes = cardObject.likes;
    this._cardId = cardObject.id;
    this._userId = cardObject.owner_id;
    this._cardTemplateId = document.querySelector(cardTemplateId);
    this._cardDelete = handleCardDelete; //колбэк с открытием попапа удаления, поэтому берется извне
    this._imageZoom = handleCardImageZoom; //колбэк с открытием попапа изображения
    this._setLike = handleLikeSet; //колбэк с отправкой на апи
    this._deleteLike = handleLikeDelete;
  }

  _getTemplateCard() {
    return this._cardTemplateId
      .content
      .querySelector('.card')
      .cloneNode(true);
  }

  createCard() {
    this._cardElement = this._getTemplateCard();
    this._likeButton = this._cardElement.querySelector('.card__like-button');
    this._likeCounter = this._cardElement.querySelector('.card__like-counter');
    this._deleteButton = this._cardElement.querySelector('.card__delete');
    this._cardImage = this._cardElement.querySelector('.card__image');
    this._cardTitle = this._cardElement.querySelector('.card__title');

    this._cardImage.src = this._image;
    this._cardImage.alt = this._title;
    this._cardTitle.textContent = this._title;
    this.setEventListeners();

    return this._cardElement;
  }

  deleteCard() {

  }

  setLike(evtTarget) {
    evtTarget.classList.add('card__like-button_active')
  }

  deleteLike(evtTarget) {
    evtTarget.classList.remove('card__like-button_active')
  }

  _switchLikeState(evtTarget) {
    if (evtTarget.classList.contains('card__like-button_active')) {
      this._setLike();
    } else {
      this._deleteLike();
    }
  }

  setEventListeners() {
    this._cardElement.addEventListener('click', evt => {
      const evtTarget = evt.target;
      if (evtTarget.matches(this._likeButton)) {
        this._switchLikeState(evtTarget);
      } else if (evtTarget.matches(this._deleteButton)) {
        this._cardDelete();
      } else {
        this._imageZoom();
      }
    })
  }
}
