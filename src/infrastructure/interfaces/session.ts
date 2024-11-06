import { Session, User } from "@prisma/client";

export interface ISession {
  getToken: (tokenId: string) => Promise<Session | null>;
  createToken: (user: User) => Promise<Session>;
  deleteToken: (tokenId: string) => Promise<Session | null>;
}
