import { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { GET_MY_NOTES, GetMyNotesData } from 'gql/query';

import { NoteFeed } from 'components/Notes/NoteFeed';

export const MyNotes = () => {
  useEffect(() => {
    document.title = 'Notedly: Мои заметки';
  }, []);

  const { data, loading, error } = useQuery<GetMyNotesData>(GET_MY_NOTES);

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
