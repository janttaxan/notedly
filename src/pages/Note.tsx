import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

import { Note as NoteType } from 'core/entities';
import { Note } from 'components/Notes/Note';

interface NotePageData {
  note: NoteType;
}

interface NotePageVars {
  noteId: string;
}

const GET_NOTE = gql`
  query note($noteId: ID!) {
    note(noteId: $noteId) {
      createdAt
      content
      favoriteCount
      author {
        username
        id
        avatar
      }
    }
  }
`;

export const NotePage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useQuery<NotePageData, NotePageVars>(GET_NOTE, { variables: { noteId: id } });

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>Ошибка! Заметка не найдена</p>;
  }

  return <div>{data && <Note note={data.note} />}</div>;
};
