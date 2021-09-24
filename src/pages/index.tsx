import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Layout } from 'components/Layout/Layout';

import { Favorites } from 'pages/Favorites';
import { Home } from 'pages/Home';
import { MyNotes } from 'pages/MyNotes';

export const Pages = () => {
  return (
    <Router>
      <Layout>
        <>
          <Route exact path='/' component={Home} />
          <Route exact path='/mynotes' component={MyNotes} />
          <Route exact path='/favorites' component={Favorites} />
        </>
      </Layout>
    </Router>
  );
};
