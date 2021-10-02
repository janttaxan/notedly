import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';

import { Note as NoteType } from 'core/entities';
import { IS_LOGGED_IN } from 'gql/query';

import { NoteUser } from 'components/Notes/NoteUser';

const StyledNote = styled.article`
  max-width: 800px;
`;

const MetaData = styled.div`
  @media (min-width: 500px) {
    display: flex;
    align-items: flex-start;
  }
`;

const MetaInfo = styled.div`
  padding-right: 1em;
`;

const UserActions = styled.div`
  margin-left: auto;
`;

interface NoteProps {
  note: NoteType;
  isPreview?: boolean;
}

export const Note = ({ note, isPreview = false }: NoteProps) => {
  const { data, loading, error } = useQuery(IS_LOGGED_IN);

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>Ошибка!</p>;
  }

  return (
    <StyledNote>
      <MetaData>
        <MetaInfo>
          <img src={note.author.avatar} alt={`${note.author.username} avatar`} height='50px' />
        </MetaInfo>
        <MetaInfo>
          <em>by</em> {note.author.username} <br />
          <span title={new Date(note.createdAt).toLocaleString()}>
            {formatDistanceToNow(new Date(note.createdAt), { addSuffix: true, locale: ru })}
          </span>
        </MetaInfo>
        {data.isLoggedIn && (
          <UserActions>
            <NoteUser note={note} />
          </UserActions>
        )}
      </MetaData>
      {!isPreview && <ReactMarkdown children={note.content} />}
    </StyledNote>
  );
};
