import { useEffect } from 'react';

export const MyNotes = () => {
  useEffect(() => {
    document.title = 'Notedly: Мои заметки';
  }, []);

  return (
    <div>
      <p>my notes page</p>
    </div>
  );
};
