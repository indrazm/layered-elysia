import { Note, User } from "@prisma/client";

export interface INotes {
  getAll(user: User): Promise<Note[]>;
  getById(id: string): Promise<Note | null>;
  create(note: Note): Promise<Note>;
  update(id: string, note: Note): Promise<Note | null>;
  delete(id: string): Promise<Note | null>;
}

export type InsertNote = Omit<Note, "id">;
export type UpdateNote = Partial<Note>;
