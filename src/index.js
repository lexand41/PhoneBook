import control from './script/control';
import * as render from './script/render';
import {getStorage} from './script/serviceStorage';

import './index.html';

import './scss/index.scss';

const {
  hoverRow,
  modalControl,
  deleteControl,
  formControl,
  sortContacts,
  delContactPhone,
} = control;

{
  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);

    const {
      list,
      logo,
      btnAdd,
      formOverlay,
      form,
      btnDel,
    } = render.renderPhoneBook(app, title);

    // Функционал
    const newData = getStorage('data');
    const allRow = render.renderContacts(list, newData);
    const {closeModal} = modalControl(btnAdd, formOverlay);

    hoverRow(allRow, logo);
    deleteControl(btnDel, list);
    formControl(form, list, closeModal);

    // Сортировка имени и фамилии, по алфавиту.
    const num = localStorage.getItem('num');
    sortContacts(num);

    // Удаление контакта, по номеру телефона.
    delContactPhone();
  };

  init('#app', 'Александр');
}
