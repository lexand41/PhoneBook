import createElements from './createElements';
import {addContactData, removeStorage} from './serviceStorage';

const {
  createRow,
} = createElements;

const hoverRow = (allRow, logo) => {
  allRow.forEach(contact => {
    const text = logo.textContent;
    contact.addEventListener('mouseenter', () => {
      logo.textContent = contact.phoneLink.textContent;
    });

    contact.addEventListener('mouseleave', () => {
      logo.textContent = text;
    });
  });
};

const modalControl = (btnAdd, formOverlay) => {
  const openModal = () => {
    formOverlay.classList.add('is-visible');
  };
  const closeModal = () => {
    formOverlay.classList.remove('is-visible');
  };

  btnAdd.addEventListener('click', openModal);

  formOverlay.addEventListener('click', e => {
    const target = e.target;
    if (target === formOverlay || target.closest('.close')) {
      closeModal();
    }
  });
  return {
    closeModal,
  };
};

const deleteControl = (btnDel, list) => {
  btnDel.addEventListener('click', () => {
    document.querySelectorAll('.delete').forEach(del => {
      del.classList.toggle('is-visible');
    });
  });

  list.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.del-icon')) {
      target.closest('.contact').remove();
    }
  });
};

const addContactPage = (contact, list) => {
  list.append(createRow(contact));
};

const formControl = (form, list, closeModal) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newContact = Object.fromEntries(formData);

    addContactPage(newContact, list);
    addContactData(newContact);
    form.reset();
    closeModal();
  });
};

const sortContacts = (e) => {
  const contacts = document.querySelector('table');
  const sortByName = (a) => {
    if (a === null) a = 2;
    const sortedRows = Array.from(contacts.rows)
        .slice(1)
        .sort((rowA, rowB) =>
          (rowA.cells[a].innerHTML > rowB.cells[a].innerHTML ? 1 : -1));

    contacts.tBodies[0].append(...sortedRows);
  };

  const surNameByAlfabet = document.querySelector('.surname');
  surNameByAlfabet.addEventListener('click', () => {
    localStorage.setItem('num', 2);
    sortByName(2);
  });

  const nameByAlfabet = document.querySelector('.name');
  nameByAlfabet.addEventListener('click', () => {
    localStorage.setItem('num', 1);
    sortByName(1);
  });

  sortByName(e);
};

const delContactPhone = () => {
  const btnNumTel = document.querySelector('.btnVar');
  btnNumTel.addEventListener('click', () => {
    const numTel = prompt('Введите номер телефона');
    removeStorage(numTel);
  });
};

export default {
  hoverRow,
  modalControl,
  deleteControl,
  formControl,
  sortContacts,
  delContactPhone,
};
