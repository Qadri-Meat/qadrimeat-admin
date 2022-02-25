import api from './api';
import TokenService from './token.service';

class AuthService {
  login(creadentials) {
    return api.post('auth/login', creadentials).then((response) => {
      if (response.data) {
        TokenService.setAuthInfo(response.data);
      }
      return response.data;
    });
  }

  logout() {
    TokenService.removeAuthInfo();
  }
}

export default new AuthService();
