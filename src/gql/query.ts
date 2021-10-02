import { gql } from '@apollo/client';

import { Note as NoteType, NoteFeed, User } from 'core/entities';

// ************************************** IS_LOGGED_IN
export interface IsLoggedInData {
  isLoggedIn: boolean;
}

export const IS_LOGGED_IN = gql`
  query {
    isLoggedIn @client
  }
`;

// ************************************** GET_ME
export interface GetMeData {
  me: User;
}

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

// ************************************** GET_NOTES
export interface GetNotesData {
  noteFeed: NoteFeed;
}

export interface GetNotesVars {
  cursor: string;
  limit: number;
}

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

// ************************************** GET_MY_NOTES
export interface GetMyNotesData {
  me: User;
}

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

// ************************************** GET_MY_FAVORITES
export interface GetMyFavoritesData {
  me: User;
}

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

// ************************************** GET_NOTE
export interface GetNoteData {
  note: NoteType;
}

export interface GetNoteVars {
  noteId: string;
}

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
