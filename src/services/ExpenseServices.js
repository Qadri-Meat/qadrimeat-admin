import ApiService from "./ApiService";

class ExpenseService extends ApiService {
  /**
   * Get all users with optional query parameters
   * @param {string} query - Optional query parameters
   * @returns {Promise<User>}
   */
  getAll(query) {
    return this.instance.get(`/v1/expenses?${query}`);
  }

  /**
   * Get a user by their ID
   * @param {ObjectId} id - The ID of the user to get
   * @returns {Promise<User>}
   */
  get(id) {
    return this.instance.get(`/v1/expenses/${id}`);
  }

  /**
   * Update the current user with the given data
   * @param {object} data - The data to update the user with
   * @returns {Promise<User>}
   */
  update(data) {
    return this.instance.patch("/v1/expenses", data);
  }

  /**
   * Update a user with the given ID with the given data
   * @param {object} data - The data to update the user with
   * @param {ObjectId} id - The ID of the user to update
   * @returns {Promise<User>}
   */
  updateById({ id, data }) {
    const postData = {
      description: data.description,
      amount: data.amount,
      type: data.type,
    };
    return this.instance.patch(`/v1/expenses/${id}`, postData);
  }
  /**
   * Create a user with the given data
   * @param {object} data - The data to update the user with
   * @returns {Promise<User>}
   */
  create(data) {
    const formData = new FormData();
    Object.entries(data).forEach((entry) => {
      const [key, value] = entry;
      if (key === "image") {
        value.forEach((item) => {
          formData.append(key, item);
        });
      } else {
        formData.append(key, value);
      }
    });
    return this.instance.post(`/v1/expenses`, formData);
  }
  /**
   * Delete a user with the given id
   *  @param {ObjectId} id - The ID of the user to delete
   * @returns {Promise<User>}
   */
  delete(id) {
    return this.instance.delete(`/v1/expenses/${id}`);
  }
}

const userServiceInstance = new ExpenseService();

export default userServiceInstance;
