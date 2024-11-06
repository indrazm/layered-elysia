import { Container } from "inversify";

import { LoggerDev } from "@/infrastructure/logger/logger.dev";
import { LoggerProd } from "@/infrastructure/logger/logger.prod";
import { NoteRepository } from "@/infrastructure/repositories/note";
import { SessionRepository } from "@/infrastructure/repositories/session";
import { UserRepository } from "@/infrastructure/repositories/user";
import { TYPES } from "@/infrastructure/types";

import { AuthService } from "./services/auth-service";
import { NoteService } from "./services/note-service";
import { UserService } from "./services/user-service";

export const container = new Container();

if (process.env.NODE_ENV === "development") {
  container.bind(TYPES.logger).to(LoggerDev);
} else {
  container.bind(TYPES.logger).to(LoggerProd);
}

container.bind(TYPES.userRepo).to(UserRepository);
container.bind(TYPES.noteRepo).to(NoteRepository);
container.bind(TYPES.sessionRepo).to(SessionRepository);

container.bind(UserService).toSelf();
container.bind(NoteService).toSelf();
container.bind(AuthService).toSelf();

export const authService = container.get<AuthService>(AuthService);
export const userService = container.get<UserService>(UserService);
export const noteService = container.get<NoteService>(NoteService);
