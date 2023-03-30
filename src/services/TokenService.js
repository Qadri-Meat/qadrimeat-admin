export default class TokenService {
  static getRefreshToken() {
    return window.localStorage.getItem("refreshToken");
  }

  static getAccessToken() {
    return window.localStorage.getItem("accessToken");
  }

  static setTokens(tokens) {
    window.localStorage.setItem("accessToken", tokens.access.token);
    window.localStorage.setItem("refreshToken", tokens.refresh.token);
  }

  static getUserData() {
    return JSON.parse(localStorage.getItem("userData"));
  }

  static setUserData(user) {
    window.localStorage.setItem("userData", JSON.stringify(user));
  }

  static removeUserData() {
    localStorage.removeItem("userData");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
  }
}
