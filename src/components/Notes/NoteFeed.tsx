import { Link } from 'react-router-dom';

import { Note as NoteType } from 'core/entities';

import { Note } from 'components/Notes/Note';
import styled from 'styled-components';

const NoteWrapper = styled.div`
  max-width: 800px;
  margin-bottom: 2em;
  padding-bottom: 2em;
  border-bottom: 1px solid #f5f4f0;
`;

interface NoteFeedProps {
  notes: Array<NoteType>;
}

export const NoteFeed = ({ notes }: NoteFeedProps) => {
  return (
    <div>
      {notes.map((note) => (
        <NoteWrapper key={note.id}>
          <Note note={note} isPreview />
          <Link to={`/note/${note.id}`}>Ссылка</Link>
        </NoteWrapper>
      ))}
    </div>
  );
};
