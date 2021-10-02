import { useCallback } from 'react';
import { useMutation } from '@apollo/client';

import { DELETE_NOTE } from 'gql/mutation';
import { GET_MY_NOTES, GET_NOTES } from 'gql/query';

import { ButtonAsLink } from 'components/common/ButtonAsLink';

interface DeleteNoteData {
  deleteNote: boolean;
}

interface DeleteNoteVars {
  noteId: string;
}

interface DeleteNoteProps {
  noteId: string;
}

export const DeleteNote = ({ noteId }: DeleteNoteProps) => {
  const [deleteNote] = useMutation<DeleteNoteData, DeleteNoteVars>(DELETE_NOTE, {
    variables: { noteId },
    refetchQueries: [{ query: GET_MY_NOTES }, { query: GET_NOTES, variables: { cursor: '', limit: 20 } }]
  });

  const handleClick = useCallback(async () => {
    await deleteNote();
  }, [deleteNote]);

  return <ButtonAsLink onClick={handleClick}>Удалить</ButtonAsLink>;
};
