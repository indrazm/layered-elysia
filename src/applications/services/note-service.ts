import "reflect-metadata";

import { User } from "@prisma/client";
import { inject, injectable } from "inversify";

import { InsertNote, UpdateNote } from "@/infrastructure/interfaces/notes";
import { NoteRepository } from "@/infrastructure/repositories/note";
import { TYPES } from "@/infrastructure/types";

@injectable()
export class NoteService {
  private noteRepo: NoteRepository;

  constructor(@inject(TYPES.noteRepo) noteRepo: NoteRepository) {
    this.noteRepo = noteRepo;
  }

  public async getAll(user: User) {
    return this.noteRepo.getAll(user);
  }

  public async getById(id: string) {
    return this.noteRepo.getById(id);
  }

  public async create(note: InsertNote) {
    return this.noteRepo.create(note);
  }

  public async update(id: string, note: UpdateNote) {
    return this.noteRepo.update(id, note);
  }

  public async delete(id: string) {
    return this.noteRepo.delete(id);
  }
}
