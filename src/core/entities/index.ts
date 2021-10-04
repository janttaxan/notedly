export interface Entity {
  id: string;
}

export interface Note extends Entity {
  content: string;
  author: User;
  favoriteCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface User extends Entity {
  username: string;
  email: string;
  avatar?: string;
  notes: Array<Note>;
  favorites: Array<Note>;
}

export interface NoteFeed {
  notes: Array<Note>;
  cursor: string;
  hasNextPage: boolean;
}
