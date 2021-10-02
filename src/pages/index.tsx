import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { FunctionComponent } from 'react';
import { useQuery } from '@apollo/client';

import { IS_LOGGED_IN } from 'gql/query';

import { Layout } from 'components/Layout/Layout';

import { Favorites } from 'pages/Favorites';
import { Home } from 'pages/Home';
import { MyNotes } from 'pages/MyNotes';
import { NotePage } from 'pages/Note';
import { SignIn } from 'pages/SignIn';
import { SignUp } from 'pages/SignUp';

export const Pages = () => {
  return (
    <Router>
      <Layout>
        <>
          <Route exact path='/' component={Home} />
          <PrivateRoute path='/mynotes' component={MyNotes} />
          <PrivateRoute path='/favorites' component={Favorites} />
          <Route path='/note/:id' component={NotePage} />
          <Route path='/signin' component={SignIn} />
          <Route path='/signup' component={SignUp} />
        </>
      </Layout>
    </Router>
  );
};

interface PrivateRouteProps {
  component: FunctionComponent;
  path: string;
}

const PrivateRoute = ({ component: Component, path }: PrivateRouteProps) => {
  const { data, loading, error } = useQuery<{ isLoggedIn: boolean }>(IS_LOGGED_IN);

  if (loading) {
    return <p>Загрузка..</p>;
  }

  if (error) {
    return <p>Ошибка!</p>;
  }
  return (
    <Route
      path={path}
      render={(routeProps) =>
        data?.isLoggedIn ? (
          <Component />
        ) : (
          <Redirect to={{ pathname: '/signin', state: { from: routeProps.location.pathname } }} />
        )
      }
    />
  );
};
