import { useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { useHistory, useLocation } from 'react-router-dom';

import { DELETE_NOTE, DeleteNoteData, DeleteNoteVars } from 'gql/mutation';
import { GET_MY_NOTES, GET_NOTES } from 'gql/query';

import { ButtonAsLink } from 'components/common/ButtonAsLink';

interface DeleteNoteProps {
  noteId: string;
}

export const DeleteNote = ({ noteId }: DeleteNoteProps) => {
  const location = useLocation();
  const history = useHistory();

  const [deleteNote] = useMutation<DeleteNoteData, DeleteNoteVars>(DELETE_NOTE, {
    variables: { noteId },
    refetchQueries: [{ query: GET_MY_NOTES }, { query: GET_NOTES, variables: { cursor: '', limit: 20 } }],
    onCompleted: (data) => {
      if (data.deleteNote && location.pathname === `/note/${noteId}`) {
        history.push('/mynotes');
      }
    }
  });

  const handleClick = useCallback(async () => {
    await deleteNote();
  }, [deleteNote]);

  return <ButtonAsLink onClick={handleClick}>Удалить</ButtonAsLink>;
};
