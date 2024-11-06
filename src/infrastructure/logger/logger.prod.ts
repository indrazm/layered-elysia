import "reflect-metadata";

import { injectable } from "inversify";

import { ILogger } from "../interfaces/logger";

@injectable()
export class LoggerProd implements ILogger {
  info(message: string) {
    // In production, we don't want to log to the console
    // Instead, we can send logs to a logging service
    console.log(message);
  }

  error(message: string) {
    // In production, we don't want to log to the console
    // Instead, we can send logs to a logging service
    console.error(message);
  }
}
