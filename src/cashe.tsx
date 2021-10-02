import { InMemoryCache } from '@apollo/client';

import { IS_LOGGED_IN, IsLoggedInData } from 'gql/query';

export const cache = new InMemoryCache();

cache.writeQuery<IsLoggedInData>({
  query: IS_LOGGED_IN,
  data: {
    isLoggedIn: !!localStorage.getItem('token')
  }
});
