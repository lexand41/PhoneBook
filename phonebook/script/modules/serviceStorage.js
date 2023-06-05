export const getStorage = (key) => JSON.parse(localStorage.getItem(key)) || [];

const setStorage = (key, object) =>
  localStorage.setItem(key, JSON.stringify(object));

export const removeStorage = (tel) => {
  const newData = getStorage('data');
  const newDatatDel = newData.filter(contact => !(contact.phone === tel));
  setStorage('data', newDatatDel);
  location.reload();
};

export const addContactData = (contact) => {
  const newData = getStorage('data');
  newData.push(contact);
  setStorage('data', newData);
};

