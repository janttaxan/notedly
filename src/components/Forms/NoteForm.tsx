import { ChangeEvent, FormEvent, useCallback } from 'react';
import styled from 'styled-components';

import { Button } from 'components/common/Button';

const Wrapper = styled.div`
  height: 100%;
`;

const Form = styled.form`
  height: 100%;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 90%;
  min-height: 200px;
  max-height: 90%;
  resize: vertical;
  padding: 8px;
`;

interface NoteFormProps {
  content: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
}

export const NoteForm = ({ content, onChange, onSubmit }: NoteFormProps) => {
  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      onSubmit!!();
    },
    [onSubmit]
  );

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <TextArea required name='content' placeholder='Заметка' value={content} onChange={onChange} />
        <Button>Сохранить</Button>
      </Form>
    </Wrapper>
  );
};
