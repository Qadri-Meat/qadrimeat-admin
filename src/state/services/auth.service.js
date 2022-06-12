import api from './api';
import TokenService from './token.service';

class AuthService {
  login(creadentials) {
    return api.post('/auth/login', creadentials).then((response) => {
      if (
        response.data &&
        (response.data.user.role === 'manager' ||
          response.data.user.role === 'admin')
      ) {
        TokenService.setAuthInfo(response.data);
        return response.data;
      }
      return {};
    });
  }

  logout() {
    TokenService.removeAuthInfo();
  }
}

export default new AuthService();
