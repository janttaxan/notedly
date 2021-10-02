import { Link } from 'react-router-dom';

import { Note, User } from 'core/entities';
import { useQuery } from '@apollo/client';
import { GET_ME } from 'gql/query';
import { DeleteNote } from 'components/Notes/DeleteNote';
import { FavoriteNote } from 'components/Notes/FavoriteNote';

interface NoteUserProps {
  note: Note;
}

interface MeData {
  me: User;
}

export const NoteUser = ({ note }: NoteUserProps) => {
  const { data, loading, error } = useQuery<MeData>(GET_ME);

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>Ошибка! Заметка не найдена</p>;
  }

  if (!data) {
    return null;
  }

  return (
    <>
      <FavoriteNote me={data.me} noteId={note.id} favoriteCount={note.favoriteCount} />
      <br />
      {data.me.id === note.author.id && (
        <>
          <Link to={`/edit/${note.id}`}>Редактировать</Link>
          <br />
          <DeleteNote noteId={note.id} />
        </>
      )}
    </>
  );
};
