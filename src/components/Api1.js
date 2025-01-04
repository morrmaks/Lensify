export default class Api {
  constructor(baseUrl, headers) {
    this._url = baseUrl;
    this._headers = headers;
  }

  _processResponse(res) {
    if (!res.ok) {
      return Promise.reject(`код ошибки ${res.status}`);
    } else {
      return res.json();
    }
  }

  _getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers,
    })
      .then(this._processResponse)
  }

  _getUserInfo() {
    return fetch(`${this._url}/users`, {
      method: 'GET',
      headers: this._headers,
    })
      .then(this._processResponse)
  }

  renderUserAndCards() {
    return Promise.all([this._getInitialCards(), this._getUserInfo()]);
  }

  addCard(data, userId) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify ({
        name: data.title,
        link: data.link,
        owner_id: userId
      })
    })
      .then(this._processResponse)
  }

  deleteCard(card) {
    return fetch(`${this._url}/cards?id=eq.${card.id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._processResponse)
  }

  setUserInfo(info, userId) {
    return fetch(`${this._url}/users?id=eq.${userId}`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: info.name,
        bio: info.bio
      })
    })
      .then(this._processResponse)
  }

  setUserAvatar(info, userId) {
    return fetch(`${this._url}/users?id=eq.${userId}`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: info.avatar,
      })
    })
      .then(this._processResponse)
  }

  _getCardLikes(card) {
    return fetch(`${this._url}/cards?id=eq.${card.id}`, {
      method: 'GET',
      headers: this._headers,
    })
      .then(this._processResponse)
      .then(cards => cards[0].likes || [])
  }

  _setCardLikes(card, likesArr) {
    return fetch(`${this._url}/cards?id=eq.${card.id}`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        likes: likesArr
      })
    })
      .then((this._processResponse))
  }

  // setLike(card, userObject) {
  //   return fetch(`${this._url}/cards/${card.id}/likes`, {
  //     method: 'PATCH',
  //     headers: this._headers,
  //     body: JSON.stringify(userObject)
  //   }).then(this._processResponse)
  // }

  // deleteLike(card, userObject) {
  //   return fetch(`${this._url}/cards/${card.id}/likes/${userObject.id}`, {
  //     method: 'DELETE',
  //     headers: this._headers,
  //   }).then(this._processResponse)
  // }

  setLike(card, userObject) {
    return this._getCardLikes(card)
      .then(cardLikes => {
        cardLikes.push(userObject);
        console.log('лайк поставлен');
        return this._setCardLikes(card, cardLikes);
      })
  }

  deleteLike(card, userObject) {
    return this._getCardLikes(card)
      .then(cardLikes => {
        const updateLikes = cardLikes.filter(like => like.id !== userObject.id);
        console.log('лайк убран');
        return this._setCardLikes(card, updateLikes);
      })
  }
}
