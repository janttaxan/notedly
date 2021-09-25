import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import { typeDefs } from 'core/entities/typeDefs';

import { GlobalStyle } from 'components/common/GlobalStyle';
import { Pages } from 'pages';

const uri = process.env.REACT_APP_API || '';
const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  uri,
  typeDefs,
  connectToDevTools: true
});

function App() {
  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <Pages />
    </ApolloProvider>
  );
}

export default App;
