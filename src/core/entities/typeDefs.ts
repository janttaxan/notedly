import { gql } from '@apollo/client';

export const typeDefs = gql`
  type Note {
    id: ID!
    content: String!
    author: User!
    favoriteCount: Int!
    favoritedBy: [User!]
    createdAt: String!
    updatedAt: String!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    avatar: String
    notes: [Note]
    favorites: [Note]!
  }

  type NoteFeed {
    notes: [Note]!
    cursor: String!
    hasNextPage: Boolean!
  }

  type Query {
    noteFeed(cursor: String, limit: Int): NoteFeed!
    notes: [Note]!
    note(noteId: ID!): Note!
    users: [User!]!
    user(username: String!): User
    me: User
  }

  type Mutation {
    newNote(noteContent: String!): Note!
    updateNote(noteId: ID!, noteContent: String!): Note!
    deleteNote(noteId: ID!): Boolean!
    toggleFavorite(noteId: ID!): Note!
    signUp(username: String!, email: String!, password: String!): String!
    signIn(username: String, email: String, password: String!): String!
  }
`;

export const clientSchemaExtensions = gql`
  directive @client on FIELD

  extend type Query {
    isLoggedIn: Boolean
  }
`;
