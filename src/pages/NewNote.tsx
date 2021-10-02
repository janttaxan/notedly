import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import { NEW_NOTE, NewNoteData, NewNoteVars } from 'gql/mutation';

import { NoteForm } from 'components/Forms/NoteForm';
import { GET_MY_NOTES, GET_NOTES } from 'gql/query';

export const NewNote = () => {
  useEffect(() => {
    document.title = 'Notedly: Новая заметка';
  }, []);

  const history = useHistory();
  const [content, setContent] = useState('');

  const [newNote, { loading, error }] = useMutation<NewNoteData, NewNoteVars>(NEW_NOTE, {
    // повторный запрос, чтобы обновить кэш
    refetchQueries: [{ query: GET_MY_NOTES }, { query: GET_NOTES, variables: { cursor: '', limit: 20 } }],
    onCompleted: (data) => {
      history.push(`/note/${data.newNote.id}`);
    }
  });

  const handleChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  }, []);

  const handleSubmit = useCallback(async () => {
    await newNote({ variables: { noteContent: content } });
  }, [content, newNote]);

  return (
    <>
      {loading && <p>Загрузка...</p>}
      {error && <p>Ошибка!</p>}
      <NoteForm content={content} onChange={handleChange} onSubmit={handleSubmit} />
    </>
  );
};
