import React from 'react';
import ContactForm from 'components/ContactForm/ContactForm';
import { MainContainer } from './App.styled';
import Filter from 'components/Filter/Filter';
import ContactList from 'components/ContactList/ContactList';

const App = () => {
  return (
    <MainContainer>
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      <Filter />
      <ContactList />
    </MainContainer>
  );
};

export default App;
