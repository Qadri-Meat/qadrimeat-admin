import ApiService from "./ApiService";

class BookingService extends ApiService {
  /**
   * Get all Booking with optional query parameters
   * @param {string} query - Optional query parameters
   * @returns {Promise<User>}
   */
  getAll(query) {
    return this.instance.get(`/v1/bookings?${query}`);
  }

  getBookingItems(day, deal) {
    return this.instance.get(
      `/v1/bookings/booking-items?isPackage=true&day=${day}${
        deal ? `&deal=${deal}` : ""
      }`
    );
  }
  /**
   * Get a booking by their ID
   * @param {ObjectId} id - The ID of the booking to get
   * @returns {Promise<User>}
   */
  get(id) {
    return this.instance.get(`/v1/bookings/${id}`);
  }

  /**
   * Update the current booking with the given data
   * @param {object} data - The data to update the booking with
   * @returns {Promise<User>}
   */
  update(data) {
    return this.instance.patch("/v1/booking/", data);
  }

  /**
   * Update a  booking with the given ID with the given data
   * @param {object} data - The data to update the booking with
   * @param {ObjectId} id - The ID of the booking to update
   * @returns {Promise<User>}
   */
  updateById({ id, data }) {
    const { deliveryTime, ...updatedData } = data;
    return this.instance.patch(`/v1/bookings/${id}`, updatedData);
  }
  /**
   * Create a booking with the given data
   * @param {object} data - The data to update the booking with
   * @returns {Promise<User>}
   */
  create(data) {
    return this.instance.post(`/v1/bookings`, data);
  }
  /**
   * Delete a Booking with the given id
   *  @param {ObjectId} id - The ID of the Booking to delete
   * @returns {Promise<User>}
   */
  delete(id) {
    return this.instance.delete(`/v1/bookings/${id}`);
  }
  addTransaction({ id, data }) {
    console.log("in services: ", id, data);
    return this.instance.patch(`/v1/bookings/${id}/transactions`, data);
  }
  deleteTransaction(bookingId, transactionId) {
    return this.instance.delete(
      `/v1/bookings/${bookingId}/transactions/${transactionId}`
    );
  }
}
const dealServiceInstance = new BookingService();
export default dealServiceInstance;
