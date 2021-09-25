import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';

import { Note as NoteType } from 'core/entities';

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
  return (
    <StyledNote>
      <MetaData>
        <MetaInfo>
          <img src={note.author.avatar} alt='{note.author.username} avatar' height='50px' />
        </MetaInfo>
        <MetaInfo>
          <em>by</em> {note.author.username} <br />
          {format(new Date(note.createdAt), 'd MMMM yyyy', { locale: ru })}
        </MetaInfo>
        <UserActions>
          <em>Favorites:</em> {note.favoriteCount}
        </UserActions>
      </MetaData>
      {!isPreview && <ReactMarkdown children={note.content} />}
    </StyledNote>
  );
};
