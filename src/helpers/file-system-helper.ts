import fs from "fs";
import Variables from "../types/variables";
import { Credentials } from "google-auth-library/build/src/auth/credentials";
import dotenv from "dotenv";

dotenv.config();

export default class FileSystemHelper {
  private static readonly variablesPath =
    process.env.VARIABLES_PATH ?? "variables.json";

  static getVariables = (): Variables => {
    const jsonString = fs.readFileSync(this.variablesPath, "utf8");
    const jsonObject = JSON.parse(jsonString);

    return jsonObject;
  };

  static getAuthListenerPort = (): number =>
    parseInt(process.env.AUTH_LISTENER_PORT ?? "") || 4000;

  static getAggregateDataBaseUri = () =>
    process.env.AGGREGATE_DATA_BASE_URI ?? "";

  static getActivityBaseUri = () => process.env.ACTIVITY_BASE_URI ?? "";

  static saveAuthToken = (tokens: Credentials) => {
    const variables: Variables = this.getVariables();
    variables.authToken = tokens.access_token!;
    variables.refreshToken = tokens.refresh_token!;
    variables.tokenExpiryInMillis = tokens.expiry_date!;

    fs.writeFileSync(this.variablesPath, JSON.stringify(variables));
  };
}
