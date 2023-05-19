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
    if (status === 401 && !url.includes("auth")) {
      await this.refreshToken();

      const accessToken = TokenService.getAccessToken();
      if (accessToken !== null || accessToken !== "") {
        return this.instance(originalConfig);
      }
    }

    return Promise.reject(error);
  };

  refreshToken = async () => {
    const refreshToken = TokenService.getRefreshToken();
    if (refreshToken !== null || refreshToken !== "") {
      return axios
        .post(`${this.baseURL}/v1/auth/refresh-tokens`, {
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
      window.location = "/login";
    }
  };
}
