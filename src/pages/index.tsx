import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Layout } from 'components/Layout/Layout';

import { Favorites } from 'pages/Favorites';
import { Home } from 'pages/Home';
import { MyNotes } from 'pages/MyNotes';
import { NotePage } from 'pages/Note';

export const Pages = () => {
  return (
    <Router>
      <Layout>
        <>
          <Route exact path='/' component={Home} />
          <Route exact path='/mynotes' component={MyNotes} />
          <Route exact path='/favorites' component={Favorites} />
          <Route exact path='/note/:id' component={NotePage} />
        </>
      </Layout>
    </Router>
  );
};
