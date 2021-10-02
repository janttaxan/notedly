import { gql } from '@apollo/client';

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

export const DELETE_NOTE = gql`
  mutation deleteNote($noteId: ID!) {
    deleteNote(noteId: $noteId)
  }
`;

export const TOGGLE_FAVORITE = gql`
  mutation toggleFavorite($noteId: ID!) {
    toggleFavorite(noteId: $noteId) {
      id
      favoriteCount
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation signUp($username: String!, $email: String!, $password: String!) {
    signUp(username: $username, email: $email, password: $password)
  }
`;

export const SIGNIN_USER = gql`
  mutation signIn($email: String, $password: String!) {
    signIn(email: $email, password: $password)
  }
`;
