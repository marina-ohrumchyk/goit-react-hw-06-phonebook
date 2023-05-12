import React from 'react';
import { useDispatch } from 'react-redux';
import { ListItem } from './ContactListItem.styled';
import PropTypes from 'prop-types';
import { delContact } from 'redux/phonebook/phonebookSlice';

const ContactListItem = ({ contact }) => {
  const { name, number, id } = contact;
  const dispatch = useDispatch();
  const handleOnClick = id => {
    dispatch(delContact(id));
  };
  return (
    <ListItem>
      <span>{name}:</span>
      <span>{number}</span>

      <button
        type="button"
        onClick={() => {
          handleOnClick(id);
        }}
      >
        Delete
      </button>
    </ListItem>
  );
};

ContactListItem.propTypes = {
  contact: PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }),
};

export default ContactListItem;
