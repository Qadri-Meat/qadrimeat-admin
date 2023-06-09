import ApiService from "./ApiService";

class ProductService extends ApiService {
  /**
   * Get all Products with optional query parameters
   * @param {string} query - Optional query parameters
   * @returns {Promise<User>}
   */
  getAll(query) {
    return this.instance.get(`/v1/products?${query || ""}`);
  }

  /**
   * Get a Product by their ID
   * @param {ObjectId} id - The ID of the Product to get
   * @returns {Promise<User>}
   */
  get(id) {
    return this.instance.get(`/v1/products/${id}`);
  }

  /**
   * Update the current Product with the given data
   * @param {object} data - The data to update the Product with
   * @returns {Promise<User>}
   */
  update(data) {
    return this.instance.patch("/v1/products/", data);
  }

  /**
   * Update a Product with the given ID with the given data
   * @param {object} data - The data to update the Product with
   * @param {ObjectId} id - The ID of the Product to update
   * @returns {Promise<User>}
   */
  updateById({ id, data }) {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
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
    return this.instance.patch(`/v1/products/${id}`, formData, config);
  }
  /**
   * Create a Product with the given data
   * @param {object} data - The data to update the Product with
   * @returns {Promise<User>}
   */
  create(data) {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
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
    return this.instance.post(`/v1/products`, formData, config);
  }
  /**
   * Delete a Product with the given id
   *  @param {ObjectId} id - The ID of the Product to delete
   * @returns {Promise<User>}
   */
  delete(id) {
    return this.instance.delete(`/v1/products/${id}`);
  }
}

const productServiceInstance = new ProductService();

export default productServiceInstance;
