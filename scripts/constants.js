const profileEditButton = document.querySelector('.profile__edit-button');
const popups = document.querySelectorAll('.popup');
const popupContainer = document.querySelector('.popup__container');
const popupCloseButtons = document.querySelectorAll('.popup__close-button');

const popupEditProfile = document.querySelector('.popup_role_edit-profile');
const popupAddCard = document.querySelector('.popup_role_add-card');
const profileAddButton = document.querySelector('.profile__add-button');

const profileEditForm = document.forms['profile-form'];
const nameInput = profileEditForm.elements['name-input'];
const jobInput = profileEditForm.elements['job-input'];
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');

const addPlaceForm = document.forms['addPlace-form'];
const placeTitleInput = addPlaceForm.elements['placeTitle-input'];
const placeUrlInput = addPlaceForm.elements['placeUrl-input'];

const popupImage = document.querySelector('.popup_role_open-image');
const popupImageImg = document.querySelector('.popup-image__img');
const popupImageFigcaption = document.querySelector('.popup-image__figcaption');

const cardsList = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('#card-template').content;
