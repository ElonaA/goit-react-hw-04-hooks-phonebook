import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Inner, Form, Input, Label,  } from './ContactForm.styled';

import toast from 'react-hot-toast';
const dataId = require('shortid');

export default function ContactForm({onAddContact, onCheckUniq}) {

const [name, setName] = useState('');
const [number, setNumber] = useState('');
  
  //При отправке формы передает контакт через пропсы в Арр и проверяет на дубли и пустое поле
  const onSubmitContactForm = e => {
    e.preventDefault();

    const checkUniqName = onCheckUniq(name);
    if (!checkUniqName) return;

    if (!(name && number)) {
      toast.error('Empty field');
      return;
    }

    onAddContact({ id: dataId.generate(), name, number });

    reset();
  };

  //Следит за инпутом и обновляет состояние переменной имя  
  const onChangeName = e => {
    setName(e.target.value);
  };

  //Следит за инпутом и обновляет переменную состояния имя 
   const onChangeNumber = e => {
    setNumber(e.target.value);
  };

    //Чистим форму (сбрасываем поля после отправки)
  const reset = () => {
    setName('');
    setNumber('');
  };

    return (
      <Inner>
        <Form onSubmit={onSubmitContactForm}>
          <Label >
            Name
          <Input
              name="name"
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={onChangeName}
            />
          </Label>
          <Label>
            Phone
          <Input
              name="number"
              type="text"
              placeholder="Enter Phone Number"
              value={number}
              onChange={onChangeNumber}
            />
          </Label>
          <Button type="submit">Add contacts</Button>
        </Form>
      </Inner>
    );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func,
};
