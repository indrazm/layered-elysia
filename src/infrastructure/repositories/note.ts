import "reflect-metadata";

import { Note, PrismaClient, User } from "@prisma/client";
import { injectable } from "inversify";

import { INotes, InsertNote, UpdateNote } from "@/infrastructure/interfaces/notes";
import { prisma } from "@/infrastructure/utils/prisma";

@injectable()
export class NoteRepository implements INotes {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  async getAll(user: User): Promise<Note[]> {
    return await this.prisma.note.findMany({
      where: {
        authorId: user.id,
      },
    });
  }

  async getById(id: string): Promise<Note | null> {
    return await this.prisma.note.findUnique({
      where: {
        id,
      },
    });
  }

  async create(note: InsertNote): Promise<Note> {
    return await this.prisma.note.create({
      data: {
        title: note.title,
        content: note.content,
        author: {
          connect: {
            id: note.authorId,
          },
        },
      },
    });
  }

  async update(id: string, note: UpdateNote): Promise<Note | null> {
    return await this.prisma.note.update({
      where: {
        id,
      },
      data: {
        title: note.title,
        content: note.content,
      },
    });
  }

  async delete(id: string): Promise<Note | null> {
    return await this.prisma.note.delete({
      where: {
        id,
      },
    });
  }
}
