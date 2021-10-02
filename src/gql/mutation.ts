import { gql } from '@apollo/client';
import { Note as NoteType, Note } from 'core/entities';

// ************************************** NEW_NOTE
export interface NewNoteData {
  newNote: Note;
}

export interface NewNoteVars {
  noteContent: string;
}

export const NEW_NOTE = gql`
  mutation newNote($noteContent: String!) {
    newNote(noteContent: $noteContent) {
      id
      content
      createdAt
      favoriteCount
      favoritedBy {
        id
        username
      }
      author {
        id
        username
      }
    }
  }
`;

// ************************************** EDIT_NOTE
export interface EditNoteData {
  updateNote: NoteType;
}

export interface EditNoteVars {
  noteId: string;
  noteContent: string;
}

export const EDIT_NOTE = gql`
  mutation updateNote($noteId: ID!, $noteContent: String!) {
    updateNote(noteId: $noteId, noteContent: $noteContent) {
      id
      content
      createdAt
      favoriteCount
      favoritedBy {
        id
        username
      }
      author {
        username
        id
      }
    }
  }
`;

// ************************************** DELETE_NOTE
export interface DeleteNoteData {
  deleteNote: boolean;
}

export interface DeleteNoteVars {
  noteId: string;
}

export const DELETE_NOTE = gql`
  mutation deleteNote($noteId: ID!) {
    deleteNote(noteId: $noteId)
  }
`;

// ************************************** TOGGLE_FAVORITE
export interface ToggleFavoritedData {
  toggleFavorite: Note;
}

export interface ToggleFavoritedVars {
  noteId: string;
}

export const TOGGLE_FAVORITE = gql`
  mutation toggleFavorite($noteId: ID!) {
    toggleFavorite(noteId: $noteId) {
      id
      favoriteCount
    }
  }
`;

// ************************************** SIGNUP_USER
export interface SignUpUserData {
  signUp: string;
}

export interface SignUpUserVars {
  username: string;
  email: string;
  password: string;
}

export const SIGNUP_USER = gql`
  mutation signUp($username: String!, $email: String!, $password: String!) {
    signUp(username: $username, email: $email, password: $password)
  }
`;

// ************************************** SIGNIN_USER
export interface SignInUserData {
  signIn: string;
}

export interface SignInUserVars {
  email: string;
  password: string;
}

export const SIGNIN_USER = gql`
  mutation signIn($email: String, $password: String!) {
    signIn(email: $email, password: $password)
  }
`;
