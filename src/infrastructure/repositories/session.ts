import "reflect-metadata";

import { PrismaClient, User } from "@prisma/client";
import { injectable } from "inversify";

import { ISession } from "@/infrastructure/interfaces/session";
import { prisma } from "@/infrastructure/utils/prisma";

@injectable()
export class SessionRepository implements ISession {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  public async getToken(tokenId: string) {
    return await this.prisma.session.findUnique({
      where: {
        id: tokenId,
      },
      include: {
        user: true,
      },
    });
  }

  public async createToken(user: User) {
    return await this.prisma.session.create({
      data: {
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  }

  public async deleteToken(tokenId: string) {
    return await this.prisma.session.delete({
      where: {
        id: tokenId,
      },
    });
  }
}
