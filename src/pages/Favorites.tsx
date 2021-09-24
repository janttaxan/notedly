import { useEffect } from 'react';

export const Favorites = () => {
  useEffect(() => {
    document.title = 'Notedly: Избранное';
  }, []);

  return (
    <div>
      <p>favorites page</p>
    </div>
  );
};
