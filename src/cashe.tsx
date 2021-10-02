import { InMemoryCache } from '@apollo/client';
import { IS_LOGGED_IN } from 'gql/query';

export const cache = new InMemoryCache();

cache.writeQuery<{ isLoggedIn: boolean }>({
  query: IS_LOGGED_IN,
  data: {
    isLoggedIn: !!localStorage.getItem('token')
  }
});
