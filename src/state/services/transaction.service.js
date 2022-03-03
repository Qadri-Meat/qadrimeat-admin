import api from './api';

class TransactionService {
  getAll(order) {
    return api.get(`/transactions?order=${order}`);
  }

  get(id) {
    return api.get(`/transactions/${id}`);
  }

  update(id, data) {
    return api.patch(`/transactions/${id}`, data);
  }
  create(data) {
    return api.post(`/transactions`, data);
  }
}

export default new TransactionService();
