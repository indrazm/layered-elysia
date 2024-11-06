import "reflect-metadata";

import { inject, injectable } from "inversify";

import { InsertUser } from "@/infrastructure/interfaces/user";
import { SessionRepository } from "@/infrastructure/repositories/session";
import { UserRepository } from "@/infrastructure/repositories/user";
import { TYPES } from "@/infrastructure/types";

@injectable()
export class AuthService {
  private userRepo: UserRepository;
  private sessionRepo: SessionRepository;

  constructor(@inject(TYPES.userRepo) userRepo: UserRepository, @inject(TYPES.sessionRepo) sessionRepo: SessionRepository) {
    this.userRepo = userRepo;
    this.sessionRepo = sessionRepo;
  }

  public async registerUser(user: InsertUser) {
    const findUser = await this.userRepo.getByEmail(user.email);

    if (findUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await Bun.password.hash(user.password);
    const newUser = await this.userRepo.create({
      email: user.email,
      name: user.name,
      password: hashedPassword,
    });

    return newUser;
  }

  public async loginUser(email: string, password: string) {
    const user = await this.userRepo.getByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    const isValid = await Bun.password.verify(password, user.password);

    if (!isValid) {
      throw new Error("Invalid password");
    }

    const session = await this.sessionRepo.createToken(user);

    return { user, session };
  }

  public async logoutUser(token: string) {
    await this.sessionRepo.deleteToken(token);
  }

  public async getSession(token: string) {
    const session = await this.sessionRepo.getToken(token);

    if (!session) {
      throw new Error("Session not found");
    }

    return session;
  }
}
