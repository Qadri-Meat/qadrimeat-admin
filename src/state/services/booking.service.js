import api from './api';

class BookingService {
  getAll(query) {
    return api.get(`/bookings${query}`);
  }

  getBookingItems(day, deal) {
    return api.get(
      `/bookings/booking-items?isPackage=true&day=${day}${
        deal ? `&deal=${deal}` : ''
      }`
    );
  }

  get(id) {
    return api.get(`/bookings/${id}`);
  }

  create(data) {
    return api.post(`/bookings`, data);
  }

  update(id, data) {
    return api.patch(`/bookings/${id}`, data);
  }

  delete(id) {
    return api.delete(`/bookings/${id}`);
  }

  addTransaction(id, data) {
    return api.patch(`/bookings/${id}/transactions`, data);
  }

  deleteTransaction(bookingId, transactionId) {
    return api.delete(`/bookings/${bookingId}/transactions/${transactionId}`);
  }
}

export default new BookingService();
