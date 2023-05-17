import ApiService from "./ApiService";

class AuthService extends ApiService {
  /**
   * Logs in a user with the provided email and password
   * @param {string} email - User's email for login
   * @param {string} password - User's password for login
   * @returns {Promise}
   */
  login(email, password) {
    return this.instance.post(`/v1/auth/login`, { email, password });
  }

  /**
   * Refreshes the user's access token with the provided refresh token
   * @param {string} refreshToken - User's refresh token
   * @returns {Promise}
   */
  refreshToken(refreshToken) {
    return this.instance.post(`/v1/auth/refresh-token`, { refreshToken });
  }
}

export default new AuthService();
