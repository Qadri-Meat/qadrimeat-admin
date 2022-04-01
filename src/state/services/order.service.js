import api from './api';

class OrderService {
  getAll(page, limit, type, search) {
    return api.get(
      `/orders?page=${page}&limit=${limit}&type=${type}${
        search && search !== '' ? `&phone=${search}` : ''
      }`
    );
  }

  get(id) {
    return api.get(`/orders/${id}`);
  }
  create(data) {
    return api.post(`/orders`, data);
  }

  update(id, data) {
    return api.patch(`/orders/${id}`, data);
  }
  addTransaction(id, data) {
    return api.patch(`/orders/${id}/transactions`, data);
  }
}

export default new OrderService();
