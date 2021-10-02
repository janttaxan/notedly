import { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { GET_MY_FAVORITES, GetMyFavoritesData } from 'gql/query';

import { NoteFeed } from 'components/Notes/NoteFeed';

export const Favorites = () => {
  useEffect(() => {
    document.title = 'Notedly: Избранное';
  }, []);

  const { data, loading, error } = useQuery<GetMyFavoritesData>(GET_MY_FAVORITES);

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>Ошибка! {error.message}</p>;
  }

  if (data && data.me.favorites.length !== 0) {
    return <NoteFeed notes={data.me.favorites} />;
  } else {
    return <p>В избранном пусто</p>;
  }
};
