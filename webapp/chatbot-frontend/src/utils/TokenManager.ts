class TokenManager {
  authToken: string | null;
  chatTokens: Record<string, string>;

  constructor() {
    if (typeof window === "undefined")
      throw "Token manager can only be used on the client";
    this.authToken = localStorage.getItem("authToken") ?? null;
    this.chatTokens = JSON.parse(localStorage.getItem("chatTokens") ?? "{}");
  }

  isAuthenticated() {
    return this.authToken !== null;
  }

  setAuthToken(newToken: string) {
    this.authToken = newToken;
    localStorage.setItem("authToken", newToken);
  }
}

export default TokenManager;
