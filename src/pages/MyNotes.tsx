import { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { GET_MY_NOTES } from 'gql/query';
import { User } from 'core/entities';

import { NoteFeed } from 'components/Notes/NoteFeed';

interface MyNotesData {
  me: User;
}

export const MyNotes = () => {
  useEffect(() => {
    document.title = 'Notedly: Мои заметки';
  }, []);

  const { data, loading, error } = useQuery<MyNotesData>(GET_MY_NOTES);

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>Ошибка! {error.message}</p>;
  }

  if (data && data.me.notes.length !== 0) {
    return <NoteFeed notes={data.me.notes} />;
  } else {
    return <p>Заметок пока нет...</p>;
  }
};
