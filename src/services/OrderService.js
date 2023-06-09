import ApiService from "./ApiService";

class OrderService extends ApiService {
  /**
   * Get all order with optional query parameters
   * @param {string} query - Optional query parameters
   * @returns {Promise<User>}
   */
  getAll(query) {
    return this.instance.get(`/v1/orders?${query}`);
  }

  getorderItems(day, deal) {
    return this.instance.get(
      `/v1/orders/order-items?isPackage=true&day=${day}${
        deal ? `&deal=${deal}` : ""
      }`
    );
  }
  /**
   * Get a order by their ID
   * @param {ObjectId} id - The ID of the order to get
   * @returns {Promise<User>}
   */
  get(id) {
    return this.instance.get(`/v1/orders/${id}`);
  }

  /**
   * Update the current order with the given data
   * @param {object} data - The data to update the order with
   * @returns {Promise<User>}
   */
  update(data) {
    return this.instance.patch("/v1/order/", data);
  }

  /**
   * Update a  order with the given ID with the given data
   * @param {object} data - The data to update the order with
   * @param {ObjectId} id - The ID of the order to update
   * @returns {Promise<User>}
   */
  updateById({ id, data }) {
    const { deliveryTime, ...updatedData } = data;
    return this.instance.patch(`/v1/orders/${id}`, updatedData);
  }
  /**
   * Create a order with the given data
   * @param {object} data - The data to update the order with
   * @returns {Promise<User>}
   */
  create(data) {
    return this.instance.post(`/v1/orders`, data);
  }
  /**
   * Delete a order with the given id
   *  @param {ObjectId} id - The ID of the order to delete
   * @returns {Promise<User>}
   */
  delete(id) {
    return this.instance.delete(`/v1/orders/${id}`);
  }
  addTransaction({ id, data }) {
    console.log("in services: ", id, data);
    return this.instance.patch(`/v1/orders/${id}/transactions`, data);
  }
  deleteTransaction(orderId, transactionId) {
    return this.instance.delete(
      `/v1/orders/${orderId}/transactions/${transactionId}`
    );
  }
}
const orderServiceInstance = new OrderService();
export default orderServiceInstance;
