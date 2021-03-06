import { useCallback, useState } from 'react';
import { useMutation } from '@apollo/client';

import { GET_MY_FAVORITES } from 'gql/query';
import { TOGGLE_FAVORITE, ToggleFavoritedData, ToggleFavoritedVars } from 'gql/mutation';
import { User } from 'core/entities';

import { ButtonAsLink } from 'components/common/ButtonAsLink';

interface FavoriteNoteProps {
  me: User;
  noteId: string;
  favoriteCount: number;
}

export const FavoriteNote = ({ me, noteId, favoriteCount }: FavoriteNoteProps) => {
  const [count, setCount] = useState(favoriteCount);
  const [isFavorited, setIsFavorited] = useState(me.favorites.filter((note) => note.id === noteId).length > 0);

  const [toggleFavorite] = useMutation<ToggleFavoritedData, ToggleFavoritedVars>(TOGGLE_FAVORITE, {
    variables: { noteId },
    refetchQueries: [{ query: GET_MY_FAVORITES }]
  });

  const handleToggleFavorited = useCallback(async () => {
    await toggleFavorite();
    if (isFavorited) {
      setIsFavorited(false);
      setCount((prevCount) => prevCount - 1);
    } else {
      setIsFavorited(true);
      setCount((prevCount) => prevCount + 1);
    }
  }, [isFavorited, toggleFavorite]);

  return (
    <>
      <ButtonAsLink onClick={handleToggleFavorited}>
        {isFavorited ? 'Убрать из избранного' : 'Добавить в избранное'}
      </ButtonAsLink>{' '}
      ({count})
    </>
  );
};
