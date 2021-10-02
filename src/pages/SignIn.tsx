import { gql, useApolloClient, useMutation } from '@apollo/client';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { IS_LOGGED_IN } from 'gql/query';

import { UserForm } from 'components/UserForm';

interface SignInData {
  signIn: string;
}

interface SignInVars {
  email: string;
  password: string;
}

const SIGNIN_USER = gql`
  mutation signIn($email: String, $password: String!) {
    signIn(email: $email, password: $password)
  }
`;

export const SignIn = () => {
  useEffect(() => {
    document.title = 'Notedly: Вход';
  }, []);

  const history = useHistory();
  const location = useLocation<{ from?: string }>();
  const client = useApolloClient();
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    console.log(location);
  }, [location]);

  const [signIn, { loading, error }] = useMutation<SignInData, SignInVars>(SIGNIN_USER, {
    onCompleted: (data) => {
      localStorage.setItem('token', data.signIn);
      client.writeQuery<{ isLoggedIn: boolean }>({
        query: IS_LOGGED_IN,
        data: {
          isLoggedIn: true
        }
      });
      setTimeout(() => {
        if (location.state && location.state.from) {
          history.push(location.state.from);
        } else {
          history.push('/');
        }
      }, 0);
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
    await signIn({
      variables: {
        ...values
      }
    });
  }, [values, signIn]);

  return (
    <>
      <UserForm formType='signin' values={values} onChange={handleChange} onSubmit={handleSubmit} />
      {loading && <p>Загрузка...</p>}
      {error && (
        <>
          <p>Ошибка входа!</p>
          <p>{error}</p>
        </>
      )}
    </>
  );
};
