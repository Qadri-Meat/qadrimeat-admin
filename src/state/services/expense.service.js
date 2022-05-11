import api from './api';

class ExpenseService {
  getAll(page, limit) {
    return api.get(`/expenses?page=${page}&limit=${limit}`);
  }

  get(id) {
    return api.get(`/expenses/${id}`);
  }

  create(data) {
    return api.post('/expenses', data);
  }

  update(id, data) {
    return api.patch(`/expenses/${id}`, data);
  }

  delete(id) {
    return api.delete(`/expenses/${id}`);
  }
}

export default new ExpenseService();
