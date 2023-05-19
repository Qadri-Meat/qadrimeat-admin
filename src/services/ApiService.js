import axios from "axios";
import TokenService from "./TokenService";
import AuthService from "./AuthService";

export default class ApiService {
  baseURL = process.env.REACT_APP_API_URL;

  constructor() {
    this.instance = axios.create({
      baseURL: `${this.baseURL}`,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 5000,
    });

    this.initializeRequestInterceptor();
    this.initializeResponseInterceptor();
  }

  initializeRequestInterceptor() {
    this.instance.interceptors.request.use(this.handleRequest);
  }

  initializeResponseInterceptor() {
    this.instance.interceptors.response.use((response) => {
      return response;
    }, this.handleError);
  }

  handleRequest(config) {
    config.headers["Authorization"] = `Bearer ${TokenService.getAccessToken()}`;
    return config;
  }

  handleError = async (error) => {
    const originalConfig = error.config;
    const url = String(originalConfig.url);
    const status = error.response?.status;
    if (status === 401 && !url.includes("auth")) {
      await this.refreshToken();
      return this.instance(originalConfig);
    }
    return Promise.reject(error);
  };

  refreshToken = async () => {
    try {
      const refreshToken = TokenService.getRefreshToken();
      if (refreshToken !== null) {
        const res = await AuthService.refreshToken(refreshToken);
        TokenService.setTokens(res.data);
      } else {
        throw Error();
      }
    } catch (error) {
      TokenService.removeUserData();
      window.location = "/login";
    }
  };
}
