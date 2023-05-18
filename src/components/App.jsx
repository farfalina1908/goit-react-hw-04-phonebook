import React, { Component } from 'react';
import ContactsList from './Phonebook/ContactsList/ContactsList';
import Filter from './Phonebook/Filter/Filter';
import Form from './Phonebook/Form/Form';
import { nanoid } from 'nanoid/non-secure';
import css from './Phonebook.module.css';

export const App = () => {
  return (
    <div>
      <Phonebook />
    </div>
  );
};

class Phonebook extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const localData = localStorage.getItem('contacts');
    if (localData) {
      this.setState({ contacts: JSON.parse(localData) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  changeFilter = event => {
    this.setState({
      filter: event.currentTarget.value,
    });
  };

  formSubmitHandler = data => {
    const newContact = {
      id: nanoid(),
      name: data.name,
      number: data.number,
    };

    this.state.contacts.find(
      contact => contact.name.toLowerCase() === data.name.toLowerCase()
    )
      ? alert(`${data.name} is already in contacts`)
      : this.setState({
          contacts: [...this.state.contacts, newContact],
        });
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const normalizedFilter = this.state.filter.toLowerCase();
    const visibleContacts = this.state.contacts.filter(contact => {
      return contact.name.toLowerCase().includes(normalizedFilter);
    });
    return (
      <div className={css.container}>
        <Form onSubmit={this.formSubmitHandler} />
        <ContactsList
          title="Contacts"
          contacts={visibleContacts}
          onDeleteContact={this.deleteContact}
        >
          <Filter
            onChange={this.changeFilter}
            type="text"
            value={this.state.filter}
            name="filter"
            title=""
            pattern=""
          />
        </ContactsList>
      </div>
    );
  }
}
