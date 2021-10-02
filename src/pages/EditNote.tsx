import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useHistory, useParams } from 'react-router-dom';

import { GET_ME, GET_NOTE, GetMeData, GetNoteData, GetNoteVars } from 'gql/query';
import { EDIT_NOTE, EditNoteData, EditNoteVars } from 'gql/mutation';

import { NoteForm } from 'components/Forms/NoteForm';

export const EditNote = () => {
  useEffect(() => {
    document.title = 'Notedly: Редактировать заметку';
  }, []);

  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [content, setContent] = useState('');

  const { data, loading, error } = useQuery<GetNoteData, GetNoteVars>(GET_NOTE, { variables: { noteId: id } });
  const { data: userdata } = useQuery<GetMeData>(GET_ME);
  const [editNote] = useMutation<EditNoteData, EditNoteVars>(EDIT_NOTE, {
    variables: {
      noteId: id,
      noteContent: content
    },
    // повторный запрос заметок, чтобы обновить кэш
    refetchQueries: [{ query: GET_NOTE, variables: { noteId: id } }],
    onCompleted: () => {
      history.push(`/note/${id}`);
    }
  });

  useEffect(() => {
    if (data) {
      setContent(data.note.content);
    }
  }, [data]);

  const handleChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  }, []);

  const handleSubmit = useCallback(async () => {
    await editNote({
      variables: {
        noteId: id,
        noteContent: content
      }
    });
  }, [content, editNote, id]);

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>Ошибка! Заметка не найдена</p>;
  }

  if (userdata && data && userdata.me.id !== data.note.author.id) {
    return <p>Вы не можете изменять эту заметку</p>;
  }

  return <NoteForm content={content} onChange={handleChange} onSubmit={handleSubmit} />;
};
