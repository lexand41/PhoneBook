import control from './modules/control.js';
import * as render from './modules/render.js';
import {getStorage} from './modules/serviceStorage.js';

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

  window.phoneBookInit = init;
}
