class TokenService {
  getLocalRefreshToken() {
    const authInfo = JSON.parse(localStorage.getItem('authInfo'));
    return authInfo?.tokens.refresh.token;
  }

  getLocalAccessToken() {
    const authInfo = JSON.parse(localStorage.getItem('authInfo'));
    return authInfo?.tokens.access.token;
  }

  updateLocalTokens(tokens) {
    let authInfo = JSON.parse(localStorage.getItem('authInfo'));
    authInfo.tokens = tokens;
    localStorage.setItem('authInfo', JSON.stringify(authInfo));
  }

  getAuthInfo() {
    return JSON.parse(localStorage.getItem('authInfo'));
  }

  setAuthInfo(authInfo) {
    localStorage.setItem('authInfo', JSON.stringify(authInfo));
  }

  removeAuthInfo() {
    localStorage.removeItem('authInfo');
  }
}

export default new TokenService();
