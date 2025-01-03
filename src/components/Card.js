export default class Card {
  constructor(cardObject, cardTemplateId, handleCardDelete, handleCardImageZoom, handleLikeSet, handleLikeDelete, userId) {
    this._cardObject = cardObject;
    this._title = cardObject.name;
    this._image = cardObject.link;
    this._likes = cardObject.likes || [];
    this._cardId = cardObject.id;
    this._userId = cardObject.owner_id;
    this._cardTemplateId = document.querySelector(cardTemplateId);
    this._cardDelete = handleCardDelete; //колбэк с открытием попапа удаления, поэтому берется извне
    this._imageZoom = handleCardImageZoom; //колбэк с открытием попапа изображения
    this._setLike = handleLikeSet; //колбэк с отправкой на апи
    this._deleteLike = handleLikeDelete;
    this._userId = userId;
    this.isProcessing = false;
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
    this._cardData = {data: this._cardObject, counter: this._likeCounter};

    this._likeCounter.textContent = this._likesAmount();
    this._cardImage.src = this._image;
    this._cardImage.alt = this._title;
    this._cardTitle.textContent = this._title;
    this._setEventListeners();
    this._isLiked();

    return this._cardElement;
  }

  _likesAmount() {
    if (this._likes === null) return;
    return this._likes.length;
  }

  _fillLikeButton() {
    this._likeButton.classList.add('card__like-button_active')
  }

  _emptyLikeButton() {
    this._likeButton.classList.remove('card__like-button_active')
  }

  _incrementLikeCounter() {
    this._likeCounter.textContent = +this._likeCounter.textContent + 1;
  }

  _decrementLikeCounter() {
    this._likeCounter.textContent = +this._likeCounter.textContent - 1;
  }

  _handleUnlike(data) {
    this._decrementLikeCounter();
    this._emptyLikeButton();
    this._deleteLike(data)
      .catch(() => {
        this._fillLikeButton();
        this._incrementLikeCounter();
      })
      .finally(() => this.isProcessing = false)
  }

  _handleLike(data) {
    this._incrementLikeCounter(); //мгновенное изменение состояния лайка и счетчика для лучшегт UX
    this._fillLikeButton();
    this._setLike(data)
      .catch(() => { //изменение лайка в начальное состояние при ошибке запроса
        this._emptyLikeButton();
        this._decrementLikeCounter();
      })
      .finally(() => this.isProcessing = false)
  }

  _switchLikeState(data) {
    if(this.isProcessing) return; //запрет использование лайка до выполнения предыдущего запроса
    this.isProcessing = true;
    if (this._likeButton.classList.contains('card__like-button_active')) {
      this._handleUnlike(data);
    } else {
      this._handleLike(data);
    }
  }

  _setEventListeners() {
    this._cardElement.addEventListener('click', evt => {
      const evtTarget = evt.target;
      if (evtTarget === this._likeButton) {
        this._switchLikeState(this._cardData);
      } else if (evtTarget === this._deleteButton) {
        this._cardDelete({data: this._cardObject, element: this._cardElement});
      } else {
        const data = {image: this._cardObject.link, title: this._cardObject.name}
        this._imageZoom(data);
      }
    })
  }

  _isLiked() {
    this._likes.forEach(like => {
      if (like.id === this._userId) {
        this._fillLikeButton();
      }
    })
  }
}
