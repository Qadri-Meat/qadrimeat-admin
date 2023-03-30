import ApiService from "./ApiService";

export default class BatchService {
  static async getBatches(query) {
    try {
      const response = await ApiService.instance.get(`/v1/batches${query}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  static async getBatch(batchId) {
    try {
      const response = await ApiService.instance.get(`/v1/batches/${batchId}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  static async createBatch(batchData) {
    try {
      const response = await ApiService.instance.post(
        `/v1/batches/`,
        batchData
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  static async updateBatch(batchId, batchData) {
    try {
      const response = await ApiService.instance.patch(
        `/v1/batches/${batchId}`,
        batchData
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  static async deleteBatch(batchId) {
    try {
      const response = await ApiService.instance.delete(
        `/v1/batches/${batchId}`
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
}
