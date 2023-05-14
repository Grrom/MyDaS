import Variables from "../types/variables";
import { google } from "googleapis";
import { Credentials, OAuth2Client } from "google-auth-library";
import FileSystemHelper from "./file-system-helper";

export default class AuthHelper {
  private refreshToken: string;
  private clientId: string;
  private redirectUri: string;
  private clientSecret: string;
  private tokenExpiryInMillis: number;

  private oauth2Client: OAuth2Client;

  scopes: string[] = [
    "https://www.googleapis.com/auth/fitness.activity.read",
    "https://www.googleapis.com/auth/fitness.sleep.read",
  ];

  constructor({
    clientId,
    refreshToken,
    redirectUri,
    clientSecret,
    tokenExpiryInMillis,
  }: Variables) {
    this.clientId = clientId;
    this.refreshToken = refreshToken;
    this.redirectUri = redirectUri;
    this.clientSecret = clientSecret;
    this.tokenExpiryInMillis = parseInt(tokenExpiryInMillis);

    this.oauth2Client = new google.auth.OAuth2(
      this.clientId,
      this.clientSecret,
      this.redirectUri
    );
  }

  accessTokenNeedsRefresh = () => {
    const currentTime = new Date().getTime();
    const expirationThreshold = 24 * 60 * 60 * 1000;
    const expirationThresholdTime =
      this.tokenExpiryInMillis - expirationThreshold;

    return (
      this.tokenExpiryInMillis <= currentTime ||
      expirationThresholdTime <= currentTime
    );
  };

  refreshAuthToken = async () => {
    this.oauth2Client.setCredentials({
      refresh_token: this.refreshToken,
    });
    let response = await this.oauth2Client.refreshAccessToken();

    FileSystemHelper.saveAuthToken(response.credentials);
  };

  exchangeAuthCodeForTokens = async (
    authCode: string
  ): Promise<Credentials> => {
    let { tokens }: { tokens: Credentials } = await this.oauth2Client.getToken(
      authCode
    );
    return tokens;
  };

  generateAuthLink = (): URL => {
    const authorizationUrl = this.oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: this.scopes,
      include_granted_scopes: true,
    });

    return new URL(authorizationUrl);
  };
}
