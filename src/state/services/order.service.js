import api from './api';

class OrderService {
  getAll(page, limit) {
    return api.get(`/orders?page=${page}&limit=${limit}`);
  }

  get(id) {
    return api.get(`/orders/${id}`);
  }

  update(id, data) {
    return api.patch(`/orders/${id}`, data);
  }
  addTransaction(id, data) {
    return api.patch(`/orders/${id}/transactions`, data);
  }
}

export default new OrderService();
