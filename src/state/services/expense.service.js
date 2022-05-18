import api from './api';

class ExpenseService {
  getAll(query) {
    return api.get(`/expenses${query}`);
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
