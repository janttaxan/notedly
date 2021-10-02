import { ApolloClient, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { cache } from 'cashe';
import { IS_LOGGED_IN, IsLoggedInData } from 'gql/query';
import { typeDefs } from 'core/entities/typeDefs';

import { GlobalStyle } from 'components/common/GlobalStyle';

import { Pages } from 'pages';

const uri = process.env.REACT_APP_API || '';
const httpLink = createHttpLink({ uri });

const authLink = setContext(() => ({
  headers: { authorization: localStorage.getItem('token') || '' }
}));

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  resolvers: {},
  uri,
  typeDefs,
  connectToDevTools: true
});

client.onResetStore(async () =>
  cache.writeQuery<IsLoggedInData>({
    query: IS_LOGGED_IN,
    data: {
      isLoggedIn: !!localStorage.getItem('token')
    }
  })
);

function App() {
  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <Pages />
    </ApolloProvider>
  );
}

export default App;
