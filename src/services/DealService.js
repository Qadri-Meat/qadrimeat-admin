import ApiService from "./ApiService";

class DealService extends ApiService {
  /**
   * Get all users with optional query parameters
   * @param {string} query - Optional query parameters
   * @returns {Promise<User>}
   */
  getAll(query) {
    return this.instance.get(`/v1/products?${query}`);
  }

  /**
   * Get a user by their ID
   * @param {ObjectId} id - The ID of the user to get
   * @returns {Promise<User>}
   */
  get(id) {
    return this.instance.get(`/v1/products/${id}`);
  }

  /**
   * Update the current user with the given data
   * @param {object} data - The data to update the user with
   * @returns {Promise<User>}
   */
  update(data) {
    return this.instance.patch("/v1/products/", data);
  }

  /**
   * Update a user with the given ID with the given data
   * @param {object} data - The data to update the user with
   * @param {ObjectId} id - The ID of the user to update
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
   * Create a user with the given data
   * @param {object} data - The data to update the user with
   * @returns {Promise<User>}
   */
  create(data) {
    return this.instance.post(`/v1/products`, data);
  }
  /**
   * Delete a user with the given id
   *  @param {ObjectId} id - The ID of the user to delete
   * @returns {Promise<User>}
   */
  delete(id) {
    return this.instance.delete(`/v1/products/${id}`);
  }
}

const dealServiceInstance = new DealService();

export default dealServiceInstance;
