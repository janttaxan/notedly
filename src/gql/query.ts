import { gql } from '@apollo/client';

export const IS_LOGGED_IN = gql`
  query {
    isLoggedIn @client
  }
`;

export const GET_ME = gql`
  query me {
    me {
      id
      favorites {
        id
      }
    }
  }
`;

export const GET_NOTES = gql`
  query NoteFeed($cursor: String, $limit: Int) {
    noteFeed(cursor: $cursor, limit: $limit) {
      cursor
      hasNextPage
      notes {
        id
        createdAt
        content
        favoriteCount
        author {
          username
          id
          avatar
        }
      }
    }
  }
`;

export const GET_MY_NOTES = gql`
  query me {
    me {
      id
      username
      notes {
        id
        createdAt
        content
        favoriteCount
        author {
          username
          id
          avatar
        }
      }
    }
  }
`;

export const GET_MY_FAVORITES = gql`
  query me {
    me {
      id
      username
      favorites {
        id
        createdAt
        content
        favoriteCount
        author {
          username
          id
          avatar
        }
      }
    }
  }
`;

export const GET_NOTE = gql`
  query note($noteId: ID!) {
    note(noteId: $noteId) {
      id
      createdAt
      content
      favoriteCount
      author {
        username
        id
        avatar
      }
    }
  }
`;
