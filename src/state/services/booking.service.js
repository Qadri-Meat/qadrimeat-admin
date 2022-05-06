import api from './api';

class BookingService {
  getAll(page, limit, type, search) {
    return api.get(
      `/bookings?page=${page}&limit=${limit}&type=${type}${
        search && search !== '' ? `&phone=${search}` : ''
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
