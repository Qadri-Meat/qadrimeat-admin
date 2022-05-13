import api from './api';

class OrderService {
  getAll(query) {
    return api.get(`/orders${query}`);
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
