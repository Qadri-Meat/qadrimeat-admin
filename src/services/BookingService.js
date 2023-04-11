import ApiService from "./ApiService";

class BookingService extends ApiService {
  /**
   * Get all Deals with optional query parameters
   * @param {string} query - Optional query parameters
   * @returns {Promise<User>}
   */
  getAll(query) {
    return this.instance.get(`/v1/booking?${query}`);
  }

  getBookingItems(day, deal) {
    return this.instance.get(
      `/bookings/booking-items?isPackage=true&day=${day}${
        deal ? `&deal=${deal}` : ""
      }`
    );
  }

  /**
   * Get a deal by their ID
   * @param {ObjectId} id - The ID of the deal to get
   * @returns {Promise<User>}
   */
  get(id) {
    return this.instance.get(`/v1/booking/${id}`);
  }

  /**
   * Update the current deal with the given data
   * @param {object} data - The data to update the deal with
   * @returns {Promise<User>}
   */
  update(data) {
    return this.instance.patch("/v1/booking/", data);
  }

  /**
   * Update a deal with the given ID with the given data
   * @param {object} data - The data to update the deal with
   * @param {ObjectId} id - The ID of the deal to update
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
    return this.instance.patch(`/v1/booking/${id}`, data, config);
  }
  /**
   * Create a deal with the given data
   * @param {object} data - The data to update the deal with
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
    return this.instance.post(`/v1/booking`, formData, config);
  }
  /**
   * Delete a deal with the given id
   *  @param {ObjectId} id - The ID of the deal to delete
   * @returns {Promise<User>}
   */
  delete(id) {
    return this.instance.delete(`/v1/deals/${id}`);
  }

  addTransaction(id, data) {
    return this.instance.patch(`/bookings/${id}/transactions`, data);
  }

  deleteTransaction(bookingId, transactionId) {
    return this.instance.delete(
      `/bookings/${bookingId}/transactions/${transactionId}`
    );
  }
}

const dealServiceInstance = new BookingService();

export default dealServiceInstance;
