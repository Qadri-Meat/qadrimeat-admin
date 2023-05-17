import ApiService from "./ApiService";

class AuthService extends ApiService {
  /**
   * Logs in a user with the given email and password
   * @param {string} email - The email of the user to log in
   * @param {string} password - The password of the user to log in
   * @returns {Promise}
   */
  login(email, password) {
    return this.instance.post(`/v1/auth/login`, { email, password });
  }
}

const authServiceInstance = new AuthService();

export default authServiceInstance;
