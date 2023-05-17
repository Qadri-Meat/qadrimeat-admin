import ApiService from "./ApiService";

class UserService extends ApiService {
  /**
   * Get all users with optional query parameters
   * @param {string} query - Optional query parameters
   * @returns {Promise<User>}
   */

  getDashboard() {
    return this.instance.get(`v1/users/dashboard`);
  }

  getAll(query) {
    return this.instance.get(`/v1/users?${query}`);
  }

  /**
   * Get a user by their ID
   * @param {ObjectId} id - The ID of the user to get
   * @returns {Promise<User>}
   */
  get(id) {
    return this.instance.get(`/v1/users/${id}`);
  }

  /**
   * Update the current user with the given data
   * @param {object} data - The data to update the user with
   * @returns {Promise<User>}
   */
  update(data) {
    return this.instance.patch("/v1/users", data);
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
    return this.instance.patch(`/v1/users/${id}`, postData);
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
    return this.instance.post(`/v1/users`, formData);
  }
  /**
   * Delete a user with the given id
   *  @param {ObjectId} id - The ID of the user to delete
   * @returns {Promise<User>}
   */
  delete(id) {
    return this.instance.delete(`/v1/users/${id}`);
  }
}

const userServiceInstance = new UserService();

export default userServiceInstance;
