import useLocalStorage from '../../hooks/useLocalStorage';
import { Section } from 'components/Section/Section';
import { ContactList } from 'components/ContactList/ContactList';
import  ContactForm  from 'components/ContactForm/ContactForm';

import { Inner} from './App.styled';

import toast, { Toaster } from 'react-hot-toast';


export function App() {

  const [contacts, setContacts] = useLocalStorage('contacts', []);

  //Добавляем контакт в массив
  const handleAddContact = contact => {
    setContacts(prevState => [...prevState, contact]);
  };

  //Проверяем на уникальность имена, если такое уже есть в массиве выводим сообщение
  const handleUniqueName = (name) => {
    const uniqName = !!contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase(),
    )
    if (uniqName) {
      toast.error(`Oh. no! ${name} is already exist in phonebook`);
      return false;
    }
    return true;
  };

  //Удаляем контакт
  const handleDelete = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <Inner>
      <Section title="Phonebook">
        <ContactForm onAddContact={handleAddContact} onCheckUniq={handleUniqueName} />
      </Section>
      {contacts.length > 0 &&
        <Section title="Contacts">
          <ContactList contacts={contacts} onDeleteButton={handleDelete} />
        </Section>
      }
      <Toaster />
    </Inner>
  );
}
