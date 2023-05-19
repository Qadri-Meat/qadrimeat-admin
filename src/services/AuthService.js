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
}

const authService = new AuthService();
export default authService;
