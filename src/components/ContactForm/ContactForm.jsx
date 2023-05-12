import React from 'react';
import {
  FormButton,
  FormContact,
  FormField,
  FormInput,
  StyledErrorMessage,
} from './ContactForm.styled';

import { Formik } from 'formik';
import * as Yup from 'yup';
import { addContact } from 'redux/phonebook/phonebookSlice';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { getContacts } from 'redux/selectors';

const phoneRegExp =
  /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/g;

const ContactForm = () => {
  const contacts = useSelector(getContacts);

  const dispatch = useDispatch();
  const handleSubmit = contact => {
    const findContact = name => {
      const toFind = name.toLowerCase();
      if (contacts.find(({ name }) => name.toLowerCase() === toFind))
        return true;
      else return false;
    };
    if (!findContact(contact.name)) {
      dispatch(addContact({ ...contact, id: nanoid() }));
      return true;
    } else return false;
  };
  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      validationSchema={Yup.object({
        name: Yup.string()
          .matches(
            /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
            'Invalid Name'
          )
          .required(),
        number: Yup.string()
          .matches(phoneRegExp, 'Invalid phone number')
          .required(),
      })}
      onSubmit={({ name, number }, { resetForm }) => {
        if (handleSubmit({ name, number })) resetForm();
        else alert(`${name} already in contacts`);
      }}
    >
      {({ errors, values }) => (
        <FormContact>
          <FormField htmlFor="name">
            Name
            <FormInput
              name="name"
              type="text"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            />
            <StyledErrorMessage name="name" component="div" />
          </FormField>
          <FormField htmlFor="number">
            Phone
            <FormInput
              name="number"
              type="text"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            />
            <StyledErrorMessage name="number" component="div" />
          </FormField>

          <FormButton
            type="submit"
            disabled={
              errors.name ||
              errors.number ||
              values.name === '' ||
              values.number === ''
            }
          >
            Add contact
          </FormButton>
        </FormContact>
      )}
    </Formik>
  );
};

export default ContactForm;
