CREATE TABLE notes (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  modified TIMESTAMP DEFAULT now() NOT NULL,
  folderId TEXT REFERENCES folders(id) ON DELETE CASCADE NOT NULL,
  content TEXT
);