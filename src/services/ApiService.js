import axios from "axios";
import TokenService from "./TokenService";

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
    if (status === 401 && !url.includes("login")) {
      await this.refreshToken();
      return this.instance(originalConfig);
    }
    return Promise.reject(error);
  };
  refreshToken = async () => {
    const refreshToken = TokenService.getRefreshToken();
    if (refreshToken !== null) {
      return axios
        .post(`${this.baseURL}v1/auth/refresh-tokens`, {
          refreshToken,
        })
        .then(
          (response) => {
            TokenService.setTokens(response.data);
          },
          (error) => {
            TokenService.removeUserData();
            window.location = "/login";
          }
        );
    } else {
      TokenService.removeUserData();
      console.error("Refresh token not found");
      window.location = "/login";
    }
  };
}
