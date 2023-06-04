'use strict';

// const data = [
//   {
//     name: 'Иван',
//     surname: 'Петров',
//     phone: '+79514545454',
//   },
//   {
//     name: 'Игорь',
//     surname: 'Семёнов',
//     phone: '+79999999999',
//   },
//   {
//     name: 'Семён',
//     surname: 'Иванов',
//     phone: '+79800252525',
//   },
//   {
//     name: 'Мария',
//     surname: 'Попова',
//     phone: '+79876543210',
//   },
// ];

// localStorage.setItem('data', JSON.stringify(data));


{
  // localStorage.clear();

  const getStorage = (key) => JSON.parse(localStorage.getItem(key)) || [];

  const setStorage = (key, object) =>
    localStorage.setItem(key, JSON.stringify(object));

  const data = 'data';
  const newData = getStorage(data);

  const removeStorage = (tel) => {
    const newDatatDel = newData.filter(contact => !(contact.phone === tel));
    setStorage('data', newDatatDel);
    location.reload();
  };

  const addContactData = (contact) => {
    newData.push(contact);

    setStorage(data, newData);
  };

  const createContainer = () => {
    const container = document.createElement('div');
    container.classList.add('container');
    return container;
  };

  const createHeader = () => {
    const header = document.createElement('header');
    header.classList.add('header');

    const headerContainer = createContainer();
    header.append(headerContainer);

    header.headerContainer = headerContainer;

    return header;
  };

  const createLogo = title => {
    const h1 = document.createElement('h1');
    h1.classList.add('logo');
    h1.textContent = `Телефонный справочник. ${title}`;

    return h1;
  };

  const createMain = () => {
    const main = document.createElement('main');

    const mainContainer = createContainer();
    main.append(mainContainer);
    main.mainContainer = mainContainer;
    return main;
  };

  const createButtonsGroup = params => {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('btn-wrapper');

    const btns = params.map(({className, type, text}) => {
      const button = document.createElement('button');
      button.type = type;
      button.textContent = text;
      button.className = className;

      return button;
    });

    btnWrapper.append(...btns);

    return {
      btnWrapper,
      btns,
    };
  };

  const createFooter = () => {
    const footer = document.createElement('footer');
    footer.classList.add('footer');
    const footerContainer = createContainer();
    footer.append(footerContainer);

    footer.footerContainer = footerContainer;

    return footer;
  };

  const createFooterContent = title => {
    const footerContent = document.createElement('div');
    footerContent.classList.add('footer-content');
    footerContent.textContent = `Все права защищены  ©${title}`;

    return footerContent;
  };

  const createTable = () => {
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped');

    const thead = document.createElement('thead');
    thead.insertAdjacentHTML('beforeend', `
      <tr>
        <th class="delete">Удалить</th>
        <th class="name">Имя</th>
        <th class="surname">Фамилия</th>
        <th>Телефон</th>
      </tr>  
    `);

    const tbody = document.createElement('tbody');

    table.append(thead, tbody);
    table.tbody = tbody;

    return table;
  };

  const createForm = () => {
    const overlay = document.createElement('div');
    overlay.classList.add('form-overlay');

    const form = document.createElement('form');
    form.classList.add('form');
    form.insertAdjacentHTML('beforeend', `
      <button class="close" type="button"></button>
      <h2 class="form-title">Добавить контакт</h2>
      <div>
        <label class="form-label" for="name">Имя:</label>
        <input class="form-input"
          name="name" id="name" type="text" required>
      </div>
      <div>
        <label class="form-label" for="surname">Фамилия:</label>
        <input class="form-input"
          name="surname" id="surname" type="text" required>
      </div>
      <div>
        <label class="form-label" for="phone">Телефон:</label>
        <input class="form-input"
          name="phone" id="phone" type="number" required>
      </div>
    `);

    const buttonGroup = createButtonsGroup([
      {
        className: 'btn btn-primary mr-3',
        type: 'submit',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'reset',
        text: 'Отмена',
      },
    ]);

    form.append(...buttonGroup.btns);

    overlay.append(form);

    return {
      overlay,
      form,
    };
  };

  const renderPhoneBook = (app, title) => {
    const header = createHeader();
    const logo = createLogo(title);
    const main = createMain();
    const buttonGroup = createButtonsGroup([
      {
        className: 'btn btn-primary mr-3',
        type: 'button',
        text: 'добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'button',
        text: 'Удалить',
      },
      {
        className: 'btn btn-danger btnVar',
        type: 'button',
        text: 'Удалить по номеру телeфона',
      },
    ]);
    const table = createTable();
    const {form, overlay} = createForm();
    const footer = createFooter();
    const footerContent = createFooterContent(title);

    header.headerContainer.append(logo);
    main.mainContainer.append(buttonGroup.btnWrapper, table, overlay);
    footer.footerContainer.append(footerContent);
    app.append(header, main, footer);

    return {
      list: table.tbody,
      logo,
      btnAdd: buttonGroup.btns[0],
      btnDel: buttonGroup.btns[1],
      formOverlay: overlay,
      form,
    };
  };

  const createRow = ({name: firstName, surname, phone}) => {
    const tr = document.createElement('tr');
    tr.classList.add('contact');

    const tdDel = document.createElement('td');
    tdDel.classList.add('delete');
    const buttonDel = document.createElement('button');
    buttonDel.classList.add('del-icon');
    tdDel.append(buttonDel);

    const tdName = document.createElement('td');
    tdName.textContent = firstName;

    const tdSurname = document.createElement('td');
    tdSurname.textContent = surname;

    const tdPhone = document.createElement('td');
    const phoneLink = document.createElement('a');
    phoneLink.href = `tel:${phone}`;
    phoneLink.textContent = phone;
    tr.phoneLink = phoneLink;
    tdPhone.append(phoneLink);

    const tdEdit = document.createElement('td');
    const buttonEdit = document.createElement('button');
    buttonEdit.classList.add('table-btn', 'btn-edit');
    tdEdit.append(buttonEdit);

    tr.append(tdDel, tdName, tdSurname, tdPhone, tdEdit);

    return tr;
  };

  const renderContacts = (elem, newData) => {
    const allRow = newData.map(createRow);
    elem.append(...allRow);
    return allRow;
  };

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

  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);

    const {
      list,
      logo,
      btnAdd,
      formOverlay,
      form,
      btnDel,
    } = renderPhoneBook(app, title);

    // Функционал

    const allRow = renderContacts(list, newData);
    const {closeModal} = modalControl(btnAdd, formOverlay);

    hoverRow(allRow, logo);
    deleteControl(btnDel, list);
    formControl(form, list, closeModal);

    // Сортировка имени и фамилии, по алфавиту.

    const contacts = document.querySelector('table');

    const sortByName = (a) => {
      const sortedRows = Array.from(contacts.rows)
          .slice(1).sort((rowA, rowB) =>
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

    const num = localStorage.getItem('num');
    sortByName(num);

    // Удаление контакта, по номеру телефона.

    const btnNumTel = document.querySelector('.btnVar');
    btnNumTel.addEventListener('click', () => {
      const numTel = prompt('Введите номер телефона');
      removeStorage(numTel);
    });
  };

  window.phoneBookInit = init;
}
