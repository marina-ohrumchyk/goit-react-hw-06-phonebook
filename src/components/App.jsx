import Contact from 'components/Contact/Contact';
import { Component } from 'react';
import { MainContainer } from 'components/App.styled';
import { nanoid } from 'nanoid';
import Filter from 'components/Filter/Filter';
import ContactList from 'components/ContactList/ContactList';

class App extends Component {
  defaultState = {
    contacts: [],
    filter: '',
  };

  state = { ...this.defaultState };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }

    if (this.state.contacts.length === 0) {
      localStorage.removeItem('contacts');
    }
  }

  componentDidMount() {
    let contactsLocal = localStorage.getItem('contacts');

    if (contactsLocal) {
      contactsLocal = JSON.parse(contactsLocal);
      this.setState({ contacts: contactsLocal });
    }
  }

  handleOnSubitContactForm = contact => {
    if (!this.findContact(contact.name)) {
      this.addContact(contact);
      return true;
    } else return false;
  };

  addContact = contact => {
    const toAdd = { ...contact, id: nanoid() };
    this.setState(prevState => ({
      contacts: [...prevState.contacts, toAdd],
    }));
  };

  findContact = name => {
    const { contacts } = this.state;
    const toFind = name.toLowerCase();
    if (contacts.find(({ name }) => name.toLowerCase() === toFind)) return true;
    else return false;
  };

  handleOnFilterChange = filter => {
    this.setState({ filter });
  };

  showContacts = () => {
    const { contacts } = this.state;
    const filter = this.state.filter.toLocaleLowerCase();

    return contacts.filter(({ name }) => name.toLowerCase().includes(filter));
  };

  handleOnDeleteContact = contactID => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(({ id }) => id !== contactID),
    }));
  };

  render() {
    return (
      <MainContainer>
        <h1>Phonebook</h1>
        <Contact onSubmit={this.handleOnSubitContactForm} />

        <h2>Contacts</h2>
        <Filter
          filter={this.state.filter}
          onChange={this.handleOnFilterChange}
        />
        <ContactList
          contacts={this.showContacts()}
          onDelete={this.handleOnDeleteContact}
        />
      </MainContainer>
    );
  }
}

export default App;
