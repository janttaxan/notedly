import { useCallback, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { GET_NOTES } from 'gql/query';
import { NoteFeed as NoteFeedType } from 'core/entities';

import { Button } from 'components/common/Button';
import { NoteFeed } from 'components/Notes/NoteFeed';

interface NoteFeedData {
  noteFeed: NoteFeedType;
}

interface NoteFeedVars {
  cursor: string;
  limit: number;
}

export const Home = () => {
  useEffect(() => {
    document.title = 'Notedly';
  }, []);

  const { data, loading, error, fetchMore } = useQuery<NoteFeedData, NoteFeedVars>(GET_NOTES, {
    variables: { cursor: '', limit: 20 }
  });

  const handleClick = useCallback(async () => {
    await fetchMore({
      variables: { cursor: data?.noteFeed.cursor, limit: 10 },
      updateQuery: (previousResult, { fetchMoreResult }) => ({
        noteFeed: {
          cursor: fetchMoreResult ? fetchMoreResult.noteFeed.cursor : '',
          hasNextPage: fetchMoreResult ? fetchMoreResult.noteFeed.hasNextPage : false,
          // combine the new results and the old
          notes: fetchMoreResult
            ? [...previousResult.noteFeed.notes, ...fetchMoreResult.noteFeed.notes]
            : [...previousResult.noteFeed.notes],
          __typename: 'noteFeed'
        }
      })
    });
  }, [data, fetchMore]);

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>Ошибка!</p>;
  }

  return (
    <>
      {data && <NoteFeed notes={data.noteFeed.notes} />}
      {data && data.noteFeed.hasNextPage && <Button onClick={handleClick}>Загрузить еще</Button>}
    </>
  );
};
