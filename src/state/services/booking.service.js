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
  addTransaction(id, data) {
    return api.patch(`/bookings/${id}/transactions`, data);
  }
}

export default new BookingService();
