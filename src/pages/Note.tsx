import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { GET_NOTE } from 'gql/query';
import { Note as NoteType } from 'core/entities';

import { Note } from 'components/Notes/Note';
import { useEffect } from 'react';

interface NotePageData {
  note: NoteType;
}

interface NotePageVars {
  noteId: string;
}

export const NotePage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useQuery<NotePageData, NotePageVars>(GET_NOTE, { variables: { noteId: id } });

  useEffect(() => {
    document.title = `Notedly: ${data?.note.content.substr(0, 20)}`;
  }, [data?.note.content]);

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>Ошибка! Заметка не найдена</p>;
  }

  return <div>{data && <Note note={data.note} />}</div>;
};
