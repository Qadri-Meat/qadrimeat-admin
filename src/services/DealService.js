import ApiService from "./ApiService";

class DealService extends ApiService {
  /**
   * Get all Deals with optional query parameters
   * @param {string} query - Optional query parameters
   * @returns {Promise<User>}
   */
  getAll(query) {
    return this.instance.get(`/v1/products?${query}`);
  }

  /**
   * Get a deal by their ID
   * @param {ObjectId} id - The ID of the deal to get
   * @returns {Promise<User>}
   */
  get(id) {
    return this.instance.get(`/v1/products/${id}`);
  }

  /**
   * Update the current deal with the given data
   * @param {object} data - The data to update the deal with
   * @returns {Promise<User>}
   */
  update(data) {
    return this.instance.patch("/v1/products/", data);
  }

  /**
   * Update a deal with the given ID with the given data
   * @param {object} data - The data to update the deal with
   * @param {ObjectId} id - The ID of the deal to update
   * @returns {Promise<User>}
   */
  updateById({ id, data }) {
    const postData = {
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
    };
    return this.instance.patch(`/v1/products/${id}`, postData);
  }
  /**
   * Create a deal with the given data
   * @param {object} data - The data to update the deal with
   * @returns {Promise<User>}
   */
  create(data) {
    return this.instance.post(`/v1/products`, data);
  }
  /**
   * Delete a deal with the given id
   *  @param {ObjectId} id - The ID of the deal to delete
   * @returns {Promise<User>}
   */
  delete(id) {
    return this.instance.delete(`/v1/products/${id}`);
  }
}

const dealServiceInstance = new DealService();

export default dealServiceInstance;
