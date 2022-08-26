export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }
  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    }).then(res => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)));
  }
  dislikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(res => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)));
  }
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(res => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)));
  }
  postNewCard({name, link}) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(res => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)));
  }
  updateUserAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    }).then(res => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)));
  }
  updateUserInfo({name, about}) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(res => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)));
  }
  _getUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers,
    }).then(res => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)));
  }
  _getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers,
    }).then(res => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)));
  }
  getInitialData() {
    return Promise.all([this._getUser(), this._getInitialCards()]);
  }
}
