import { gql, useApolloClient, useMutation } from '@apollo/client';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { IS_LOGGED_IN } from 'gql/query';

import { UserForm } from 'components/UserForm';

interface SignUpData {
  signUp: string;
}

interface SignUpVars {
  username: string;
  email: string;
  password: string;
}

const SIGNUP_USER = gql`
  mutation signUp($username: String!, $email: String!, $password: String!) {
    signUp(username: $username, email: $email, password: $password)
  }
`;

export const SignUp = () => {
  useEffect(() => {
    document.title = 'Notedly: Регистрация';
  }, []);

  const history = useHistory();
  const client = useApolloClient();
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [signUp, { loading, error }] = useMutation<SignUpData, SignUpVars>(SIGNUP_USER, {
    onCompleted: (data) => {
      localStorage.setItem('token', data.signUp);
      client.writeQuery<{ isLoggedIn: boolean }>({
        query: IS_LOGGED_IN,
        data: {
          isLoggedIn: true
        }
      });
      history.push('/');
    }
  });

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setValues({
        ...values,
        [event.target.name]: event.target.value
      });
    },
    [values]
  );

  const handleSubmit = useCallback(async () => {
    await signUp({
      variables: {
        ...values
      }
    });
  }, [values, signUp]);

  return (
    <>
      <UserForm formType='signup' values={values} onChange={handleChange} onSubmit={handleSubmit} />
      {loading && <p>Загрузка...</p>}
      {error && (
        <>
          <p>Ошибка регистрации!</p>
          <p>{error}</p>
        </>
      )}
    </>
  );
};
