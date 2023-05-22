import fs from "fs";
import Variables from "../types/variables";
import { Credentials } from "google-auth-library/build/src/auth/credentials";

export default class FileSystemHelper {
  private static readonly variablesPath = "variables.json";

  static getVariables = (): Variables => {
    const jsonString = fs.readFileSync(this.variablesPath, "utf8");
    const jsonObject = JSON.parse(jsonString);

    return jsonObject;
  };

  static getAuthListenerPort = (): number => {
    return parseInt(process.env.AUTH_LISTENER_PORT ?? "") || 4000;
  };

  static saveAuthToken = (tokens: Credentials) => {
    const variables: Variables = this.getVariables();
    variables.authToken = tokens.access_token!;
    variables.refreshToken = tokens.refresh_token!;
    variables.tokenExpiryInMillis = tokens.expiry_date!;

    fs.writeFileSync(this.variablesPath, JSON.stringify(variables));
  };
}
