import { Component } from 'react';
import { FormButton, FormContact, FormField, FormInput } from 'components/Contact/Contact.styled';
import PropTypes from 'prop-types';

class Contact extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  handleOnSubmit = event => {
    event.preventDefault();

    const form = event.currentTarget;
    const name = form.elements.name.value;
    const number = form.elements.number.value;

    if (this.props.onSubmit({ name, number })) form.reset();
    else alert(`${name} already in contacts`);
  };

  handleOnChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    console.log(name, value);
    this.setState({ [name]: value });
  };
  render() {
    return (
      <FormContact onSubmit={this.handleOnSubmit}>
        <FormField>
          Name
          <FormInput
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </FormField>
        <FormField>
          Phone
          <FormInput
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </FormField>
        <FormButton type="submit">Add contact</FormButton>
      </FormContact>
    );
  }
}

export default Contact;
