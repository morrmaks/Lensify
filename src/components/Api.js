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

  deleteCard() {
    return fetch(`${this._url}/cards`, {
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

  setLike() {
    return fetch(`${this._url}/cards/`, {
      method: 'PATCH',
      headers: this._headers,
      body: {

      }
    })
      .then(this._processResponse)
  }

  deleteLike() {
    return fetch(`${this._url}/cards/`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._processResponse)
  }
}
