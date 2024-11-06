import { User } from "@prisma/client";

export interface IUser {
  getAll(): Promise<User[]>;
  getById(id: string): Promise<User | null>;
  getByEmail(email: string): Promise<User | null>;
  create(user: User): Promise<Omit<User, "password">>;
  update(id: string, user: User): Promise<Omit<User, "password">>;
  delete(id: string): Promise<User | null>;
}

export type InsertUser = Omit<User, "id">;
export type UpdateUser = Partial<User>;
