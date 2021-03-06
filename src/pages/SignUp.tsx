import { useApolloClient, useMutation } from '@apollo/client';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { IS_LOGGED_IN, IsLoggedInData } from 'gql/query';
import { SIGNUP_USER, SignUpUserData, SignUpUserVars } from 'gql/mutation';

import { UserForm } from 'components/Forms/UserForm';

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

  const [signUp, { loading, error }] = useMutation<SignUpUserData, SignUpUserVars>(SIGNUP_USER, {
    onCompleted: (data) => {
      localStorage.setItem('token', data.signUp);
      client.writeQuery<IsLoggedInData>({
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
