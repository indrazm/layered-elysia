import "reflect-metadata";

import { inject, injectable } from "inversify";

import { InsertUser, UpdateUser } from "@/infrastructure/interfaces/user";
import { UserRepository } from "@/infrastructure/repositories/user";
import { TYPES } from "@/infrastructure/types";

@injectable()
export class UserService {
  private userRepo: UserRepository;

  constructor(@inject(TYPES.userRepo) userRepo: UserRepository) {
    this.userRepo = userRepo;
  }

  public async getAll() {
    return await this.userRepo.getAll();
  }

  public async getById(id: string) {
    return this.userRepo.getById(id);
  }

  public async getByEmail(email: string) {
    const user = await this.userRepo.getByEmail(email);
    return user;
  }

  public async create(user: InsertUser) {
    return await this.userRepo.create(user);
  }

  public async update(id: string, user: UpdateUser) {
    return await this.userRepo.update(id, user);
  }

  public async delete(id: string) {
    return await this.userRepo.delete(id);
  }
}
