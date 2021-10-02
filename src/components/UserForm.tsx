import styled from 'styled-components';
import { ChangeEvent, FormEvent, useCallback } from 'react';

import { Button } from 'components/common/Button';

const Wrapper = styled.div`
  border: 1px solid #f5f4f0;
  max-width: 500px;
  padding: 1em;
  margin: 0 auto;
`;

const Form = styled.form`
  label,
  input {
    display: block;
    line-height: 2em;
  }

  input {
    width: 100%;
    margin-bottom: 1em;
  }
`;

interface UserFormProps {
  formType: 'signup' | 'signin';
  values: {
    username?: string;
    email: string;
    password: string;
  };
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

export const UserForm = ({ formType, values, onChange, onSubmit }: UserFormProps) => {
  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      onSubmit();
    },
    [onSubmit]
  );

  return (
    <Wrapper>
      <h2>{formType === 'signup' ? 'Регистрация' : 'Вход'}</h2>
      <Form onSubmit={handleSubmit}>
        {formType === 'signup' && (
          <>
            <label htmlFor='username'>Имя пользователя:</label>
            <input
              onChange={onChange}
              value={values.username}
              required
              type='text'
              id='username'
              name='username'
              placeholder='Имя пользователя'
            />
          </>
        )}
        <label htmlFor='email'>Email:</label>
        <input
          onChange={onChange}
          value={values.email}
          required
          type='email'
          id='email'
          name='email'
          placeholder='Email'
        />
        <label htmlFor='password'>Пароль:</label>
        <input
          onChange={onChange}
          value={values.password}
          required
          type='password'
          id='password'
          name='password'
          placeholder='Пароль'
        />
        <Button type='submit'>{formType === 'signup' ? 'Зарегистрироваться' : 'Войти'}</Button>
      </Form>
    </Wrapper>
  );
};
