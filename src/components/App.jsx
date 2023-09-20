import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { HeaderTitle, ContactsTitle } from './Header.style';

export const App = () => {
  // Створення стейту для контактів та фільтра
  const [contacts, setContacts] = useState(
    () =>
      JSON.parse(localStorage.getItem('contacts')) ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
  );
  const [filter, setFilter] = useState('');

  // Збереження контактів в локальне сховище при оновленні стану контактів
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  // Перевірка, чи існує контакт з таким ім'ям
  const isNameAlreadyExists = name => {
    const lowerCaseName = name.toLowerCase();
    return contacts.some(
      contact => contact.name.toLowerCase() === lowerCaseName
    );
  };

  // Додавання нового контакту
  const addContact = newContact => {
    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  // Видалення контакту за ідентифікатором
  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  // Зміна фільтру
  const changeFilter = event => {
    setFilter(event.target.value);
  };

  // Фільтрація контактів на основі фільтра
  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const filteredContacts = getFilteredContacts();

  return (
    <div className="App">
      <span>
        <HeaderTitle>Телефонна книга</HeaderTitle>
      </span>
      <ContactForm
        onSubmit={addContact}
        isNameAlreadyExists={isNameAlreadyExists}
      />
      <span>
        <ContactsTitle>Контакти</ContactsTitle>
      </span>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={deleteContact}
      />
    </div>
  );
};
