import { useState } from 'react';
import PropTypes from "prop-types";
import Filter from '../Filter/Filter'
import { Inner, Title, Wrapper, Button, PersonBadge, TelephonePlus,  XCircle } from './ContactList.styled';

export const ContactList = ({ contacts, onDeleteButton }) => {
  
  const [filter, setFilter] = useState('');
  console.log(contacts);
  //Обновляем состояние переменной фильтр
  const handleFilter = filter => {
    setFilter(filter);
  };

  //Отфильтровываем контакты и возвращаем результат
  const getFilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  const filteredContacts = getFilteredContacts();

  return (
    <>
      {filteredContacts.length > 1 &&
        <Filter filter={filter} onChangeFilter={handleFilter} />
      }
      <Inner>
        <ul>
           {filteredContacts.length > 0 &&
            filteredContacts.map(({ id, name, number }) => (
              <li key={id}>
                <Wrapper>
                  <PersonBadge /> <Title>{name} </Title>  <TelephonePlus /> <Title>{number}</Title>
                  <Button type="button" onClick={() => onDeleteButton(id)}>
                    < XCircle />
                  </Button>
                </Wrapper>
              </li>
            ))}
        </ul>
      </Inner>
    </>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.array,
  onDeleteButton: PropTypes.func.isRequired,
};