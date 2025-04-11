const editAvatarButton = document.querySelector('.profile__avatar-container');
const editProfileButton = document.querySelector('.edit-button');
const addCardButton = document.querySelector('.add-button');

const nameInput = document.querySelector('#name');
const bioInput = document.querySelector('#bio');
const titleCardEditInput = document.querySelector('#edit-card__title');

const config = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inputErrorSelector: 'form__input_has-error',
  inactiveSubmitButtonSelector: 'form__save-button_disabled',
  formErrorVisibleSelector: 'form__error_opened',
}

export {
  editAvatarButton,
  editProfileButton,
  addCardButton,
  nameInput,
  bioInput,
  titleCardEditInput,
  config
};
