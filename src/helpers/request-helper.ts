import AuthHelper from "./auth-helper";
import FileSystemHelper from "./file-system-helper";

export default class RequestHelper {
  private static getAuthToken = async () => {
    const authHelper = AuthHelper.getInstance();
    if (await AuthHelper.needsToReInitializeToken(authHelper)) {
      return FileSystemHelper.getTokenDetails().authToken;
    }
    return authHelper;
  };

  public static async get<T>(url: URL): Promise<T> {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${await this.getAuthToken()}`,
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  }

  public static async post<T>(url: URL, body: object): Promise<T> {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${await this.getAuthToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return await response.json();
  }

  public static async put<T>(url: URL, body: object): Promise<T> {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${await this.getAuthToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return await response.json();
  }

  public static async delete<T>(url: URL): Promise<T> {
    const response = await fetch(url, {
      method: "DELETE",
    });
    return await response.json();
  }
}
