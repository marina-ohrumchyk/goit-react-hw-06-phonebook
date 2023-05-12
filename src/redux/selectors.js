export const getContacts = state => state.phonebook.contacts;
export const getFilteredContacts = state => {
  const filterLC = state.phonebook.filter.toLocaleLowerCase();

  return state.phonebook.contacts.filter(({ name }) =>
    name.toLowerCase().includes(filterLC)
  );
};

export const getFilter = state => state.phonebook.filter;
