import React, { useState, useEffect } from 'react';
import ContactsList from './Phonebook/ContactsList/ContactsList';
import Filter from './Phonebook/Filter/Filter';
import Form from './Phonebook/Form/Form';
import { nanoid } from 'nanoid/non-secure';
import css from './Phonebook.module.css';

function App() {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const localData = localStorage.getItem('contacts');
    if (localData) {
      setContacts(JSON.parse(localData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const formSubmitHandler = data => {
    const newContact = {
      id: nanoid(),
      name: data.name,
      number: data.number,
    };

    contacts.find(
      contact => contact.name.toLowerCase() === data.name.toLowerCase()
    )
      ? alert(`${data.name} is already in contacts`)
      : setContacts([...contacts, newContact]);
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const normalizedFilter = filter.toLowerCase();
  const visibleContacts = contacts.filter(contact => {
    return contact.name.toLowerCase().includes(normalizedFilter);
  });

  return (
    <div className={css.container}>
      <Form onSubmit={formSubmitHandler} />
      <ContactsList
        title="Contacts"
        contacts={visibleContacts}
        onDeleteContact={deleteContact}
      >
        <Filter
          onChange={changeFilter}
          type="text"
          value={filter}
          name="filter"
          title=""
          pattern=""
        />
      </ContactsList>
    </div>
  );
}

export default App;
