import winston from "winston";
import LogLevel from "../types/log-level";

export default class LogsHelper {
  private static instance: LogsHelper;
  private logger: winston.Logger;

  private constructor() {
    this.logger = winston.createLogger({
      level: LogLevel.Info,
      format: winston.format.json(),
      defaultMeta: { service: "service" },
      transports: [
        new winston.transports.File({ filename: "error.log", level: "error" }),
        new winston.transports.File({ filename: "combined.log" }),
      ],
    });

    if (process.env.NODE_ENV !== "production") {
      this.logger.add(
        new winston.transports.Console({
          format: winston.format.simple(),
        })
      );
    }
  }

  public static getInstance(): LogsHelper {
    if (!LogsHelper.instance) {
      LogsHelper.instance = new LogsHelper();
    }

    return LogsHelper.instance;
  }

  public getLogger(): winston.Logger {
    return this.logger;
  }
}
