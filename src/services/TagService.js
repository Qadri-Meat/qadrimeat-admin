import ApiService from "./ApiService";

export default class TagService {
  static async getTags(query) {
    try {
      const response = await ApiService.instance.get(`/v1/tags${query}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
}
